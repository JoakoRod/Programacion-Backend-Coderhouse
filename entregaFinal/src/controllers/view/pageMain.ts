import { Request, Response, NextFunction } from 'express'
import moment from 'moment';
import { productosAPI, mensajesAPI, ordenesAPI, carritosAPI } from '../apis';
import mandarMail from '../../services/email';
import config from '../../config'


const load = async (req: Request | any, res: Response, next: NextFunction) => {

    const mensajes: any = await mensajesAPI.getMessagePopulate('user');

    if (Array.isArray(mensajes)) {
        mensajes.forEach((mensaje: any) => {
            mensaje.updatedAt = moment(mensaje.updatedAt).format("DD/MM/YYYY HH:mm:ss");
        });
    } else {
        mensajes.updatedAt = moment(mensajes.updatedAt).format("DD/MM/YYYY HH:mm:ss");
    }
    const datos = {
        productos: await productosAPI.getProduct(),
        mostrar: true,
        ruta: '/producto',
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
        await productosAPI.addProduct(producto);
        res.redirect('/productos');
    } catch (error) {
        next(error);
    }
}

const compra = async (req: Request | any, res: Response, next: NextFunction) => {
    //realizar proceso de compra (encontrar los productos, restar stock y demas)
    const productos = req.body;
    const listaProductosCompletos: object[] = [];

    for (const producto of productos) {
        listaProductosCompletos.push({ producto: (await productosAPI.queryProduct({ nombre: producto.nombre }))[0], cantidad: producto.cantidad });
    }

    await ordenesAPI.addOrden({
        userEmail: req.user.email,
        items: listaProductosCompletos,
        numero: 100 //es demasiado complejo hacer un sistema que mantenga el numero que se maneja en /src/controllers/api/ordenes. Implementar auto-Incremental o usar _id
    });

    mandarMail(config.user, `nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`, String(JSON.stringify(req.body, null, 2)));
    mandarMail(req.user.email, `Su pedido esta en camino :D`, String(JSON.stringify(req.body, null, 2)));
    res.send({ msg: "ok" });
}

const userId = (req: Request | any, res: Response, next: NextFunction) => {
    res.send(req.user.id);
}

export default {
    load,
    guardarProducto,
    compra,
    userId
}