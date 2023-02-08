/* import { Router, Request, Response, NextFunction } from 'express';
import { escribirNormalizado, getAll, getAllNormal, leerDenormalizadoDesdeArchivo, save } from '../../api/mensajes';
const router = Router();

router.get('/normalizado', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mensajesNormalizados = await getAll()
        res.json(mensajesNormalizados)
    } catch (error) {
        next(error);
    }
});

router.get('/denormalizado', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mensajes = await getAllNormal()
        res.json(mensajes)
    } catch (error) {
        next(error);
    }
});

router.get('/normalizarEnArchivo', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await escribirNormalizado()
        res.json({msg:'ok'})
    } catch (error) {
        next(error);
    }
});

router.get('/denormalizarDesdeArchivo', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await leerDenormalizadoDesdeArchivo())
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const msg = req.body;
        await save(msg);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
});

export default router; */