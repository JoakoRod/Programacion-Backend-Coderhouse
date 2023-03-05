import { productosAPI } from '../../api';
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors';

let productosDao: productosAPI;


productosAPI.getInstance().then((instance) => {
    productosDao = instance;
});

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        res.json(await productosDao.getProduct(id));
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body;
        await productosDao.addProduct(product);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
};

const putProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const product = req.body;
    
        await productosDao.updateProduct(id, product);
        res.json({ msg: 'ok' });
    
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await productosDao.deleteProduct(id);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
};


export default {
    getProduct,
    addProduct,
    putProduct,
    deleteProduct
};