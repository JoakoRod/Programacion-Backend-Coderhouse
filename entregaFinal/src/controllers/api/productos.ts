import { productosAPI } from '../apis'
import { Request, Response, NextFunction } from 'express'

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        res.json(await productosAPI.getProduct(id));
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body;
        await productosAPI.addProduct(product);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
};

const putProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const product = req.body;
    
        await productosAPI.updateProduct(id, product);
        res.json({ msg: 'ok' });
    
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await productosAPI.deleteProduct(id);
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