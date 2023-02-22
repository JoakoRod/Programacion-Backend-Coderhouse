import { Request, Response, NextFunction } from 'express'
import { puerto } from '../../index';
import os from 'os';

const info = (req: Request | any, res: Response, next: NextFunction) => {
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
};

export default {
    info
};