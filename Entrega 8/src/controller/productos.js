import fs from 'fs';
import createError from 'http-errors';
import { DBService } from '../services/db';

const tableName = 'productos';

class Products {
    comprobarProducto(product) {
        if (typeof product.price == 'string') product.price = parseFloat(product.price);
        if (!product.title || !product.price || !product.thumbnail || typeof product.title !== 'string' ||
            typeof product.price !== 'number' || typeof product.thumbnail !== 'string') throw createError(400, 'Datos invalidos');
    }

    async getAll() {
        return await DBService.get(tableName);
    }

    async getById(id) {
        return await DBService.get(tableName, id);
    }

    async save(product) {
        this.comprobarProducto(product);
        const result = await DBService.create(tableName, product);
        return result[0];
    }

    async findByIdAndUptade(id, product) {
        await DBService.update(tableName, id, product);
    }

    async findByIdAndDelete(id) {
        await DBService.delete(tableName, id);
    }
}

const instanciaProducts = new Products();

module.exports = {
    ProductsController: instanciaProducts
}