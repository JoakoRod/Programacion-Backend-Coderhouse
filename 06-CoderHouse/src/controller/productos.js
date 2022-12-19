const fs = require('fs');
const createError = require('http-errors');

class Products {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
    }

    agregarId(productos) {
        for (let i = 0; i < productos.length; i++) {
            productos[i].id = i + 1;
        }

        return productos
    }

    comprobarProducto(product) {
        if (typeof product.price == 'string') product.price = parseFloat(product.price);
        if (!product.title || !product.price || !product.thumbnail || typeof product.title !== 'string' ||
            typeof product.price !== 'number' || typeof product.thumbnail !== 'string') throw createError(400, 'Datos invalidos');
    }

    encontrarIdPorId(id, productos) {
        const index = productos.findIndex((producto) => producto.id == id);
        if (index < 0) throw createError(404, 'El Producto no existe');
        return index;
    }

    async escribirArchivo(texto) {
        try {
            //Borrar los id antes de guardar en el .json
            texto.forEach(producto => {
                delete producto.id;
            });
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(texto, null, 2));
            //console.log("Contenido guardado");
        } catch (error) {
            throw createError(500, 'Error al guardar archivo');;
        }
    }

    async getAll() {
        const resultado = await fs.promises.readFile(`./${this.archivo}`, 'utf-8');
        const resultadoParse = JSON.parse(resultado);
        return this.agregarId(resultadoParse);
    }

    async getById(id) {
        const productos = await this.getAll();
        const index = this.encontrarIdPorId(id, productos);

        return productos[index];
    }

    async save(product) {
        this.comprobarProducto(product);

        const productos = await this.getAll();
        const id = productos[productos.length - 1].id + 1;
        product.id = id;
        productos.push(product);

        await this.escribirArchivo(productos);
        return id;
    }

    async findByIdAndUptade(id, product) {
        const products = await this.getAll();
        const index = this.encontrarIdPorId(id, products);
        products[index].title = product.title || products[index].title;
        products[index].price = product.price || products[index].price;
        products[index].thumbnail = product.thumbnail || products[index].thumbnail;

        await this.escribirArchivo(products);
    }

    async findByIdAndDelete(id) {
        const products = await this.getAll();
        const index = this.encontrarIdPorId(id, products);
        products.splice(index, 1);

        await this.escribirArchivo(products);
    }
}

const instanciaProducts = new Products('src/data/productos.json');

module.exports = {
    ProductsController: instanciaProducts
}