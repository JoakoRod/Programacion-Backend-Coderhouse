import { Router, Request, Response, NextFunction } from 'express';
import os from 'os';
import { puerto } from '../../index';
import { logger } from '../../services/logger';
const router = Router();

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /info');
    res.json({
        "Cantidad de CPUs:": os.cpus().length,
        "Argumentos de entrada: ": process.argv.slice(2),
        "Sistema operativo: ": process.platform,
        "Versión de node.js: ": process.version,
        "Memoria total reservada: ": process.memoryUsage(),
        "Path de ejecución: ": process.execPath,
        "Process id: ": process.pid,
        "Carpeta del proyecto: ": process.cwd(),
        "Puerto: ": puerto
    })
})

router.get('/info2', (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /info2');
    res.json({
        "Cantidad de CPUs:": os.cpus().length,
        "Argumentos de entrada: ": process.argv.slice(2),
        "Sistema operativo: ": process.platform,
        "Versión de node.js: ": process.version,
        "Memoria total reservada: ": process.memoryUsage(),
        "Path de ejecución: ": process.execPath,
        "Process id: ": process.pid,
        "Carpeta del proyecto: ": process.cwd(),
        "Puerto: ": puerto
    })
})

export default router;