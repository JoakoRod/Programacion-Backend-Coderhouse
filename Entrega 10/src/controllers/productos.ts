import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { productosModel } from '../../models/productos';

export const getAllProductos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await productosModel.find());
    } catch (error) {
        next(error);
    }
};

export const getProductosBy_id = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await productosModel.findById(req.params._id));
    } catch (error) {
        next(error);
    }

};

export const getProductoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const producto = await productosModel.findOne({ id: { $eq: parseInt(req.params.id) } });
        if (!producto) throw createError(400, 'El id ingresado no existe');
        res.json(producto);
    } catch (error) {
        next(error);
    }

};

export const saveProducto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const id: number = await productosModel.find().count() + 1;

        const nuevoProducto = await productosModel.create({
            id,
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        });

        res.json(nuevoProducto);

    } catch (error) {
        next(error);
    }
};

export const UptadeByid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

        let item = await productosModel.findById(id);

        if (!item) throw createError(400, "El producto no existe!");

        const productoUpdated = await productosModel.findByIdAndUpdate(
            id,
            { nombre, descripcion, codigo, foto, precio, stock },
            { new: true }
        );

        res.json({
            msg: 'Producto updated',
            data: productoUpdated,
        });

    } catch (error) {
        next(error);
    }
};

export const DeleteByid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        let item = await productosModel.findById(id);
        if (!item) throw createError(400, "El producto no existe!");

        const productoDeleted = await productosModel.findByIdAndDelete(id);
        res.json({
            msg: 'Product deleted',
            data: productoDeleted,
        });
    } catch (error) {
        next(error);
    }
};