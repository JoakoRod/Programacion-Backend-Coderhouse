import { carritosAPI } from '../apis'
import { Request, Response, NextFunction } from 'express'

const getCarrito = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const carrito = await carritosAPI.getOneByIdUserCarrito(req.user.id);
        res.json(carrito);
    } catch (error) {
        next(error);
    }
};

const addCarrito = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        await carritosAPI.addCarrito({ user: String(req.user.id), direccion: req.body.direccion, items: [] });
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
};

const addProducto = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        let posicion = -1;
        const idProducto: string = req.params.idProducto;
        const cantidad: number = parseInt(req.params.cantidad);
        const carrito = await carritosAPI.getOneByIdUserCarrito(req.user.id);

        //controlar si el producto ya esta en el carrito
        for (const [index, producto] of carrito!.items.entries()) {
            if (producto.idProduct == idProducto) {
                posicion = index;
                break;
            }
        }

        if (posicion == -1) { //si el producto no estaba en el carrito, hay que agregarlo
            carrito!.items.push({ idProduct: idProducto, cantidad: cantidad });
        } else { //si el producto si estaba en el carrito, hay que sumar las cantidades
            carrito!.items[posicion].cantidad += cantidad;
        }
        const carritoActualizado = await carritosAPI.updateCarrito(carrito!.id, carrito!);
        res.json(carritoActualizado);
    } catch (error) {
        next(error);
    }
};

const putCarrito = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        await carritosAPI.updateOneByIdUserCarrito(String(req.user.id), req.body);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
};

const deleteCarrito = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        await carritosAPI.deleteOneByIdUserCarrito(req.user.id);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
};

export default {
    getCarrito,
    addCarrito,
    addProducto,
    putCarrito,
    deleteCarrito
};