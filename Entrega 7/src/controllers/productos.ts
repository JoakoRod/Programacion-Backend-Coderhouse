import fs from 'fs';
import createError from 'http-errors';
import { typeProducto } from '../utils/types/types';


class Productos {
    private archivo: string;

    public constructor(nombreArchivo: string) {
        this.archivo = nombreArchivo;
    }

    public async getAll() {
        const resultado: string = await fs.promises.readFile(`./${this.archivo}`, 'utf-8') || '[]'; //por si el archivo esta vacio
        const resultadoParse: typeProducto[] = JSON.parse(resultado);
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

    encontrarIndexPorId(id: number, productos: typeProducto[]) {
        const index = productos.findIndex((producto) => producto.id == id);
        if (index < 0) throw createError(404, 'El Producto no existe');
        return index;
    }

    async getById(id: number) {
        const productos: typeProducto[] = await this.getAll();
        const index = this.encontrarIndexPorId(id, productos);

        return productos[index];
    }

    comprobarProducto(p: typeProducto) {
        if (!p.nombre || !p.descripcion || !p.codigo || !p.foto || !p.precio || !p.stock ||
            typeof p.nombre !== 'string' || typeof p.descripcion !== 'string' || typeof p.codigo !== 'number' || typeof p.foto !== 'string'
            || typeof p.precio !== 'number' || typeof p.stock !== 'number') throw createError(400, 'Datos invalidos');
    }

    async save(producto: typeProducto) {
        this.comprobarProducto(producto);

        const productos: typeProducto[] = await this.getAll();
        const id: number = productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1;
        producto.id = id;
        producto.timestamp = Date.now();
        productos.push(producto);

        await this.escribirArchivo(JSON.stringify(productos, null, 2));
        return id;
    }

    async findByIdAndUptade(id: number, producto: typeProducto) {
        const productos: typeProducto[] = await this.getAll();
        const index: number = this.encontrarIndexPorId(id, productos);
        productos[index].id = producto.id || productos[index].id;
        productos[index].timestamp = producto.timestamp || productos[index].timestamp;
        productos[index].nombre = producto.nombre || productos[index].nombre;
        productos[index].descripcion = producto.descripcion || productos[index].descripcion;
        productos[index].codigo = producto.codigo || productos[index].codigo;
        productos[index].foto = producto.foto || productos[index].foto;
        productos[index].precio = producto.precio || productos[index].precio;
        productos[index].stock = producto.stock || productos[index].stock;

        this.comprobarProducto(productos[index]);
        await this.escribirArchivo(JSON.stringify(productos, null, 2));
    }

    async findByIdAndDelete(id: number) {
        const productos: typeProducto[] = await this.getAll();
        const index: number = this.encontrarIndexPorId(id, productos);
        productos.splice(index, 1);

        await this.escribirArchivo(JSON.stringify(productos, null, 2));
    }
}



export const productosController = new Productos('data/productos.json');