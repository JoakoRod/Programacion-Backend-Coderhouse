import { createKnex, deleteKnex, getKnex, updateKnex } from '../../controllers/knex';
import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

const tableName = 'productos';

function comprobarAdmin(req: Request, res: Response, next: NextFunction) {
    const admin = false; //CONTROL DE ADMIN
    if (!admin) {
        return res.status(401).json({ error: "Not authorized" })
    } else {
        next();
    }
}

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getKnex(tableName);
        data?.length != 0 ? res.json(data) : res.json({ msg: 'No se encontraron productos' })
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const data = await getKnex(tableName, id);
        data?.length != 0 ? res.json(data) : res.json({ msg: 'No se encontro ningun producto con el id ingresado' })

    } catch (error) {
        next(error);
    }
});

router.post('/', comprobarAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = req.body;
        await createKnex(tableName, product);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
});

router.put('/:id', comprobarAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const product = req.body;

        await updateKnex(tableName, product, id);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }

});

router.delete('/:id', comprobarAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deleteKnex(tableName, id);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }

});

export default router;