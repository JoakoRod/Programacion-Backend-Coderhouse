const fs = require('fs');
const path = require('path');

class Contenedor {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
    }

    getAll() {
        try {
            const resultado = fs.readFileSync(`./${this.archivo}`, 'utf-8');
            return JSON.parse(resultado);
        } catch (error) {
            throw error;
        }
    }

    /* async getAll() {
        try {
            const resultado = await fs.promises.readFile(`./${this.archivo}`, "utf-8");
            return JSON.parse(resultado);
        } catch (error) {
            throw error;
        }
    } */

    escribirArchivo(texto) {
        try {
            fs.writeFileSync(`./${this.archivo}`, JSON.stringify(texto, null, 2));
        } catch (error) {
            throw error;
        }
    }

    getById(id) {
        const productos = this.getAll();
        return productos[id] || null;
    }

    save(producto) {
        if (!producto.title || !producto.price || !producto.thumbnail || typeof producto.title !== 'string' ||
            typeof producto.price !== 'number' || typeof producto.thumbnail !== 'string') throw new Error('Datos invalidos')


        const productos = this.getAll();
        producto.id = productos.length + 1;
        productos.push(producto)
        this.escribirArchivo(productos);
        return producto.id;
    }

    deleteById(id) {
        const productos = this.getAll();
        const index = productos.findIndex(elemento => elemento.id === id);
        if (index === -1) throw new Error("El id ingresado no existe");
        productos.splice(index, 1);
        this.escribirArchivo(productos);
    }

    deleteAll(){
        this.escribirArchivo([]);
    }
}


const contenedor = new Contenedor('productos.json');
console.table(contenedor.getAll());
console.log(contenedor.getById(0));
const productoNuevo = {
    "title": "lapicera",
    "price": 50.11,
    "thumbnail": "https://cdn2.iconfinder.com/data/icons/budicon-writing/25/pen-writing-256.png",
    "id": 1
};
const id = contenedor.save(productoNuevo);
console.log(`El id asignado es ${id}`);
contenedor.deleteById(4);
contenedor.deleteAll();