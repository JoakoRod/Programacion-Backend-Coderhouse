import { Request, Response, NextFunction } from 'express'
import moment from 'moment';
import { productosAPI, mensajesAPI } from '../api';
import { mandarMsg, mandarWsp } from '../services/twilio';
import { mandarMail } from '../services/email';
import config from '../config'
import createError from 'http-errors';

let productosDao: productosAPI;

productosAPI.getInstance().then((instance) => {
    productosDao = instance;
});

const load = async (req: Request | any, res: Response, next: NextFunction) => {

    const mensajes = await mensajesAPI.getAllPopulate();
    mensajes.forEach((mensaje: any) => {
        mensaje.createdAt = moment(mensaje.createdAt).format("DD/MM/YYYY HH:mm:ss")
    });

    const datos = {
        productos: await productosDao.getProduct(),
        mostrar: true,
        ruta: '/',
        mensajes: mensajes,
        user: `${req.user.firstName} ${req.user.lastName}`,
        admin: req.user.role == 'admin'
    };

    if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
    res.render('carga_vista', datos);
}

const guardarProducto = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const producto = req.body;
        const result = productosDao.validateSchema(producto);
        if (result.errors) {
            throw createError(500, result.errors.map((a) => a.message));
        } else {
            await productosDao.addProduct(producto);
            res.redirect('/')
        };
    } catch (error) {
        next(error);
    }
}

const loadCarrito = (req: Request | any, res: Response, next: NextFunction) => {
    //terminar
}

const compra = async (req: Request | any, res: Response, next: NextFunction) => {
    //realizar proceso de compra (encontrar los productos, restar stock y demas)
    mandarMail(config.user, `nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`, String(JSON.stringify(req.body, null, 2)));
    mandarWsp(`nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`);
    mandarMsg('Su pedido ha sido reccibido y sera enviado a la brevedad', req.user.phone)
    res.send({ msg: "ok" });
}

const userId = (req: Request | any, res: Response, next: NextFunction) => {
    res.send(req.user._id);
}

export default {
    load,
    guardarProducto,
    loadCarrito,
    compra,
    userId
}