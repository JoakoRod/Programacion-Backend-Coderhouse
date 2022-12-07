import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { carritosModel } from '../../models/carritos';
import { productosModel } from '../../models/productos';


export const getProductsByIdDeCarrito = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const carrito = await carritosModel.findById(id);
        if (!carrito) throw createError(400, 'El id ingresado no existe');
        if (carrito.productos.length == 0) {
            res.json({ msg: 'El carrito esta vacio' });
        } else {
            res.json(carrito.productos);
        }
    } catch (error) {
        next(error);
    }
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
}

/* import { typeCarrito, typeProducto } from '../utils/types/types';
import { productosController } from './productos';

class Carrito {
    private archivo: string;

    public constructor(nombreArchivo: string) {
        this.archivo = nombreArchivo;
    }

    public async getAll() {
        const resultado: string = await fs.promises.readFile(`./${this.archivo}`, 'utf-8') || '[]'; //por si el archivo esta vacio
        const resultadoParse: typeCarrito[] = JSON.parse(resultado);
        return resultadoParse;
    }

    async escribirArchivo(texto: string) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, texto);
            //console.log("Contenido guardado");
        } catch (error) {
            throw createError(500, 'Error al guardar archivo');;
        }
    }

    async create() {
        const carritos: typeCarrito[] = await this.getAll();
        const id: number = carritos.length !== 0 ? carritos[carritos.length - 1].id + 1 : 1; //por si no existe un carrito previo
        console.log(carritos.length - 1);
        let carrito: typeCarrito = {
            id: id,
            timestamp: Date.now(),
            productos: []
        }
        carritos.push(carrito);

        await this.escribirArchivo(JSON.stringify(carritos, null, 2));
        return id;
    }

    encontrarIndexPorId(id: number, carritos: typeCarrito[]) {
        const index = carritos.findIndex((carrito) => carrito.id == id);
        if (index < 0) throw createError(404, 'El Carrito no existe');
        return index;
    }

    async findByIdAndDelete(id: number) {
        const carritos: typeCarrito[] = await this.getAll();
        const index: number = this.encontrarIndexPorId(id, carritos);
        carritos.splice(index, 1);

        await this.escribirArchivo(JSON.stringify(carritos, null, 2));
    }

    async getProductsById(id: number) {
        const carritos: typeCarrito[] = await this.getAll();
        const index: number = this.encontrarIndexPorId(id, carritos);
        return carritos[index].productos;
    }

    verificarIdProd(idProd: number) {
        if(!idProd) throw createError(400, 'Id de producto no ingresado');
        if (typeof idProd !== 'number') throw createError(400, 'El Id del producto no es un numero');
    }

    async addProductById(id: number, idProd: number) {
        this.verificarIdProd(idProd);
        const carritos: typeCarrito[] = await this.getAll();
        const index: number = this.encontrarIndexPorId(id, carritos);
        const producto: typeProducto = await productosController.getById(idProd);
        carritos[index].productos.push(producto);
        await this.escribirArchivo(JSON.stringify(carritos, null, 2));
    }

    async deleteProductById(id: number, idProd: number) {
        this.verificarIdProd(idProd);
        const carritos: typeCarrito[] = await this.getAll();
        const indexCarrito: number = this.encontrarIndexPorId(id, carritos);
        const indexProducto: number = carritos[indexCarrito].productos.findIndex((producto) => producto.id == idProd);
        if (indexProducto == -1) throw createError(404, 'El Producto ingresado no se encuentra en el carrito');
        carritos[indexCarrito].productos.splice(indexProducto, 1);
        await this.escribirArchivo(JSON.stringify(carritos, null, 2));
    }

}*/
