import { ordenesAPI, carritosAPI, productosAPI } from '../apis'
import { Request, Response, NextFunction } from 'express'

let numeroOrden = -1;

const getOrden = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        res.json(await ordenesAPI.getOrden(id));
    } catch (error) {
        next(error);
    }
};

const addOrden = async (req: Request | any, res: Response, next: NextFunction) => {
    try {

        const carrito = await carritosAPI.getOneByIdUserCarrito(req.user.id); //Obtener el carrito del usuario
        const items: object[] = []

        for (const producto of carrito!.items) {
            items.push({ producto: await productosAPI.getProduct(producto.idProduct), cantidad: producto.cantidad }) //conseguir data de productos
        }


        if (carrito?.items.length != 0) { //revisar el numero de orden
            if (numeroOrden < 1) {
                const ordenes = await ordenesAPI.getOrden();
                if (Array.isArray(ordenes) && ordenes.length != 0) numeroOrden = ordenes[ordenes.length - 1].numero + 1;
                else numeroOrden = 1;
            }
            await ordenesAPI.addOrden({ userEmail: req.user.email, items: items, numero: numeroOrden });
            numeroOrden++; // incrementar numero de orden
            await carritosAPI.updateCarrito(carrito!.id, { items: [] }) //vaciar carrito
            res.json({ msg: 'ok' });
        } else {
            res.status(400).send('Su carrito esta vacio');
        }

    } catch (error) {
        next(error);
    }
};

const putOrden = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const Orden = req.body;

        await ordenesAPI.updateOrden(id, Orden);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
};

const deleteOrden = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await ordenesAPI.deleteOrden(id);
        numeroOrden--;
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
};


export default {
    getOrden,
    addOrden,
    putOrden,
    deleteOrden
};