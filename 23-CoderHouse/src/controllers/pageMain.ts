import { Context, Next } from 'koa';
import moment from 'moment';
import { productosAPI, mensajesAPI } from '../api';
import { mandarMsg, mandarWsp } from '../services/twilio';
import { mandarMail } from '../services/email';
import config from '../config'
import { isLoggedInPage } from '../middlewares/auth';

let productosDao: productosAPI;
let messagesDao: mensajesAPI;

productosAPI.getInstance().then((instance) => {
    productosDao = instance;
});

mensajesAPI.getInstance().then((instance) => {
    messagesDao = instance;
});

const load = async (ctx: Context | any, next: Next) => {
    isLoggedInPage
    const mensajes: any = await messagesDao.getMessagePopulate('user');

    if (Array.isArray(mensajes)) {
        mensajes.forEach((mensaje: any) => {
            mensaje.updatedAt = moment(mensaje.updatedAt).format("DD/MM/YYYY HH:mm:ss");
        });
    } else {
        mensajes.updatedAt = moment(mensajes.updatedAt).format("DD/MM/YYYY HH:mm:ss");
    }
    const datos = {
        productos: await productosDao.getProduct(),
        mostrar: true,
        ruta: '/',
        mensajes: mensajes,
        user: `${ctx.user.firstName} ${ctx.user.lastName}`,
        admin: ctx.user.role == 'admin'
    };

    if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
    ctx.render('carga_vista', datos);
}

const guardarProducto = async (ctx: Context | any, next: Next) => {
    const producto = ctx.request.body;
    const result = productosDao.validateSchema(producto);
    if (result.errors) {
        ctx.throw(500, result.errors.map((a) => a.message));
    } else {
        await productosDao.addProduct(producto);
        ctx.redirect('/')
    };
}

const loadCarrito = (ctx: Context | any, next: Next) => {
    //terminar
}

const compra = async (ctx: Context | any, next: Next) => {
    //realizar proceso de compra (encontrar los productos, restar stock y demas)
    mandarMail(config.user, `nuevo pedido de ${ctx.user.email} - ${ctx.user.firstName} ${ctx.user.lastName}`, String(JSON.stringify(ctx.body, null, 2)));
    mandarWsp(`nuevo pedido de ${ctx.user.email} - ${ctx.user.firstName} ${ctx.user.lastName}`);
    mandarMsg('Su pedido ha sido reccibido y sera enviado a la brevedad', ctx.user.phone)
    ctx.send({ msg: "ok" });
}

const userId = (ctx: Context | any, next: Next) => {
    ctx.send(ctx.user.id);
}

export default {
    load,
    guardarProducto,
    loadCarrito,
    compra,
    userId
}