import { createKnex, deleteKnex, getKnex, updateKnex } from '../../controllers/knex';
import { isAdmin } from '../../middlewares/auth';
import { Router, Request, Response, NextFunction } from 'express';
import { logger } from '../../services/logger';

const router = Router();

const tableName = 'productos';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/productos/');
    try {
        const data = await getKnex(tableName);
        data?.length != 0 ? res.json(data) : res.json({ msg: 'No se encontraron productos' })
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/productos/:id');
    try {
        const id = req.params.id
        const data = await getKnex(tableName, id);
        data?.length != 0 ? res.json(data) : res.json({ msg: 'No se encontro ningun producto con el id ingresado' })

    } catch (error) {
        next(error);
    }
});

router.post('/', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /api/productos/');
    try {
        const product = req.body;
        await createKnex(tableName, product);
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

        await updateKnex(tableName, product, id);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }

});

router.delete('/:id', isAdmin, async (req: Request, res: Response, next: NextFunction) => {
    logger.info('DELETE /api/productos/:id');
    try {
        const id = req.params.id;
        await deleteKnex(tableName, id);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }

});

export default router;