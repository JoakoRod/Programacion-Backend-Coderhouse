import { productosModel, Iproductos } from '../models/productos';
import createError from 'http-errors';

export async function getAllProducts() {
    try {
        return await productosModel.find().lean();
    } catch (error) {
        throw createError(500, `error con la db ${error}`)
    }

}

export async function saveProduct(product: Iproductos) {
    try {
        return await productosModel.create(product)
    } catch (error) {
        throw createError(500, `error con la db ${error}`)
    }
}