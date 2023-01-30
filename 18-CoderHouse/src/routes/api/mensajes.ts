import { Router, Request, Response, NextFunction } from 'express';
import { escribirNormalizado, getAll, getAllNormal, leerDenormalizadoDesdeArchivo, save } from '../../controllers/mensajes';
import { logger } from '../../services/logger';
const router = Router();

router.get('/normalizado', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/mensajes/normalizado');
    try {
        const mensajesNormalizados = await getAll()
        res.json(mensajesNormalizados)
    } catch (error) {
        next(error);
    }
});

router.get('/denormalizado', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/mensajes/denormalizado');
    try {
        const mensajes = await getAllNormal()
        res.json(mensajes)
    } catch (error) {
        next(error);
    }
});

router.get('/normalizarEnArchivo', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/mensajes/normalizarEnArchivo');
    try {
        await escribirNormalizado()
        res.json({msg:'ok'})
    } catch (error) {
        next(error);
    }
});

router.get('/denormalizarDesdeArchivo', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /api/mensajes/denormalizarDesdeArchivo');
    try {
        res.json(await leerDenormalizadoDesdeArchivo())
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /api/mensajes/');
    try {
        const msg = req.body;
        await save(msg);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
});

export default router;