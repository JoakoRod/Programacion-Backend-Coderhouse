import fs from 'fs';
import createError from 'http-errors';
import { typeCarrito, typeProducto } from '../utils/types/types';
import { productosController } from '../controllers/productos';

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

}

export const carritoController = new Carrito('data/carrito.json');