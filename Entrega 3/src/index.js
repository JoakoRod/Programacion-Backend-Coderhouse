const express = require('express');
const fs = require('fs');

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
            typeof producto.price !== 'number' || typeof producto.thumbnail !== 'string') throw new Error('Datos invalidos');


        const productos = await this.getAll();
        producto.id = productos.length + 1;
        productos.push(producto);
        await this.escribirArchivo(productos);
        return producto.id;
    }

    async deleteById(id) {
        const productos = await this.getAll();
        const index = productos.findIndex(elemento => elemento.id === id);
        if (index === -1) throw new Error("El id ingresado no existe");
        productos.splice(index, 1);
        await this.escribirArchivo(productos);
        console.log("Borrado con exito");
    }

    async deleteAll() {
        await this.escribirArchivo([]);
        console.log("contenido eliminado");
    }
}

const app = express();
const contenedor = new Contenedor('src/productos.json');

const server = app.listen(8080, () => {
    console.log(`Funcionando, puerto:${server.address().port}`);
})

server.on('error', error => console.log(`Error en el server: ${error}`));

/* app.get('/', (req, res) => {
    res.send(`<h1 style="color:blue">prueba</h1>`);
}) */

app.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.send(productos);
})

app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll();
    const productoRandom = productos[Math.floor(Math.random()*productos.length)]
    res.send(productoRandom);
})