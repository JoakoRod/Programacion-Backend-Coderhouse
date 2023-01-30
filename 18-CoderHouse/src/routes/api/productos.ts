import { Iproductos, productosModel } from '../../models/productos';
import { isAdmin } from '../../middlewares/auth';
import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../../services/logger';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/productos/');
    try {
        const data: Iproductos[] = await productosModel.find().lean();
        data?.length != 0 ? res.json(data) : res.json({ msg: 'No se encontraron productos' })
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/productos/:id');
    try {
        const id = req.params.id
        const data: Iproductos | null = await productosModel.findById(id)
        data ? res.json(data) : res.json({ msg: 'No se encontro ningun producto con el id ingresado' })

    } catch (error) {
        next(error);
    }
});

router.post('/', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /api/productos/');
    try {
        const product = req.body;
        await productosModel.create(product);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
});

router.put('/:id', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    logger.info('PUT /api/productos/:id');
    try {
        const id = req.params.id;
        const product = req.body;

        await productosModel.findOneAndUpdate({ _id: id }, product);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }

});

router.delete('/:id', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    logger.info('DELETE /api/productos/:id');
    try {
        const id = req.params.id;
        await productosModel.deleteOne({ _id: id });
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }

});

export default router;