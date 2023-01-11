import { Router, Request, Response, NextFunction } from 'express';
import os from 'os';
const router = Router();

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        "cantidad de CPUs:": os.cpus().length,
        "argumentos de entrada: ": process.argv.slice(2),
        "sistema operativo: ": process.platform,
        "Versión de node.js: ": process.version,
        "Memoria total reservada: ": process.memoryUsage(),
        "Path de ejecución: ": process.execPath,
        "Process id: ": process.pid,
        "Carpeta del proyecto: ": process.cwd()

    })
})

export default router;