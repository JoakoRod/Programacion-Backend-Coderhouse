import { productosModel, Iproductos } from '../database/daos/mongo/schemas/productos';
import createError from 'http-errors';

const getAllProducts = async () => {
    try {
        return await productosModel.find().lean();
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }

}

const saveProduct = async (product: Iproductos) => {
    try {
        return await productosModel.create(product);
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
}

export default {
    getAllProducts,
    saveProduct
}