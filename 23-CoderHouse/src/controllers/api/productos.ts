import { productosAPI } from '../../api';
import { Context, Next } from 'koa';

let productosDao: productosAPI;


productosAPI.getInstance().then((instance) => {
    productosDao = instance;
});

const getProduct = async (ctx: Context | any, next: Next) => {
    const id = ctx.params.id;
    ctx.response.body = await productosDao.getProduct(id);

};

const addProduct = async (ctx: Context | any, next: Next) => {
    const product = ctx.request.body;
    await productosDao.addProduct(product);
    ctx.response.body = { msg: 'ok' };
};

const putProduct = async (ctx: Context | any, next: Next) => {
    const id = ctx.params.id;
    const product = ctx.request.body;

    await productosDao.updateProduct(id, product);
    ctx.response.body = { msg: 'ok' };
};

const deleteProduct = async (ctx: Context | any, next: Next) => {
    const id = ctx.params.id;
    await productosDao.deleteProduct(id);
    ctx.response.body = { msg: 'ok' };
};


export default {
    getProduct,
    addProduct,
    putProduct,
    deleteProduct
};