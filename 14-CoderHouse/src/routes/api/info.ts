import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
    res.json({
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