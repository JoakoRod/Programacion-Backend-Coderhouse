const fs = require('fs');
const path = require('path');

class Contenedor {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
    }

    async getAll() {
        try {
            const resultado = await fs.promises.readFile(`./${this.archivo}`, 'utf-8');
            return JSON.parse(resultado);
        } catch (error) {
            throw error;
        }
    }

    async escribirArchivo(texto) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(texto, null, 2));
            //console.log("Contenido guardado");
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        const productos = await this.getAll();
        return productos[id] || null;
    }

    async save(producto) {
        if (!producto.title || !producto.price || !producto.thumbnail || typeof producto.title !== 'string' ||
            typeof producto.price !== 'number' || typeof producto.thumbnail !== 'string') throw new Error('Datos invalidos')


        const productos = await this.getAll();
        producto.id = productos.length + 1;
        productos.push(producto)
        await this.escribirArchivo(productos);
        return producto.id;
    }

    async deleteById(id) {
        const productos = await this.getAll();
        const index = productos.findIndex(elemento => elemento.id === id);
        if (index === -1) throw new Error("El id ingresado no existe");
        productos.splice(index, 1);
        await this.escribirArchivo(productos);
        console.log("Borrado con exito")
    }

    async deleteAll() {
        await this.escribirArchivo([]);
        console.log("contenido eliminado")
    }
}

async function main() {
    const contenedor = new Contenedor('productos.json');

    console.table(await contenedor.getAll());
    console.log(await contenedor.getById(0));

    const productoNuevo = {
        "title": "lapicera",
        "price": 50.11,
        "thumbnail": "https://cdn2.iconfinder.com/data/icons/budicon-writing/25/pen-writing-256.png",
        "id": 1
    };

    const id = await contenedor.save(productoNuevo);
    console.log(`El id asignado es ${id}`);

    await contenedor.deleteById(4);
    //await contenedor.deleteAll();
}

main();