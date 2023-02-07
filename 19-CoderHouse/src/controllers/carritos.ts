/* import createError from "http-errors";
import { carritosModel } from "../models/carritos";

export async function getProductsByIdDeCarrito(id: number) {
    return await carritosModel.findById(id);
}

export const createCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = await carritosModel.find().count() + 1;
        const carritoCreado = await carritosModel.create({ id: id, productos: [] });
        res.json(carritoCreado);
    } catch (error) {
        next(error);
    }
}

export const agregarProductoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCarrito = req.params.id;
        const idProducto = req.body.id;

        const producto = await productosModel.findById(idProducto);
        if (!producto) throw createError(400, 'El producto no existe');

        const carrito = await carritosModel.findById(idCarrito)
        if (!carrito) throw createError(400, 'El carrito no existe');

        carrito.productos.push({
            _id: producto._id,
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            codigo: producto.codigo,
            foto: producto.foto,
            precio: producto.precio,
            stock: producto.stock,
        });

        const nuevoResutado = await carritosModel.findByIdAndUpdate(idCarrito, { productos: carrito.productos }, { new: true });
        res.json({ msg: 'El producto se agrego correctamente', data: nuevoResutado });
    } catch (error) {
        next(error);
    }
}

export const DeleteCarritoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const carrito = await carritosModel.findById(id);
        if (!carrito) throw createError(400, 'El id del carrito no existe');
        await carritosModel.findByIdAndDelete(id);
        res.json({ msg: 'Carrito eliminado correctamente' });
    } catch (error) {
        next(error);
    }
}

export const DeleteProductoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCarrito = req.params.id;
        const idProducto = req.params.id_prod;

        const producto = await productosModel.findById(idProducto);
        if (!producto) throw createError(400, 'El producto no existe');

        const carrito = await carritosModel.findById(idCarrito)
        if (!carrito) throw createError(400, 'El carrito no existe');

        const index = carrito.productos.findIndex(producto => producto._id == idProducto);
        if (index == -1) throw createError(400, 'El carrito no contiene ese producto');
        carrito.productos.splice(index, 1);

        const nuevoResutado = await carritosModel.findByIdAndUpdate(idCarrito, { productos: carrito.productos }, { new: true });

        res.json({ msg: 'El producto se elimino correctamente', data: nuevoResutado });
    } catch (error) {
        next(error);
    }
} */