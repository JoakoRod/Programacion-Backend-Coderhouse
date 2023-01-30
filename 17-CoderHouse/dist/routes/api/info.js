"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const os_1 = __importDefault(require("os"));
const index_1 = require("../../index");
const logger_1 = require("../../services/logger");
const router = (0, express_1.Router)();
router.get('/info', (req, res, next) => {
    logger_1.logger.info('GET /info');
    console.log('a');
    res.json({
        "Cantidad de CPUs:": os_1.default.cpus().length,
        "Argumentos de entrada: ": process.argv.slice(2),
        "Sistema operativo: ": process.platform,
        "Versión de node.js: ": process.version,
        "Memoria total reservada: ": process.memoryUsage(),
        "Path de ejecución: ": process.execPath,
        "Process id: ": process.pid,
        "Carpeta del proyecto: ": process.cwd(),
        "Puerto: ": index_1.puerto
    });
});
router.get('/info2', (req, res, next) => {
    logger_1.logger.info('GET /info2');
    res.json({
        "Cantidad de CPUs:": os_1.default.cpus().length,
        "Argumentos de entrada: ": process.argv.slice(2),
        "Sistema operativo: ": process.platform,
        "Versión de node.js: ": process.version,
        "Memoria total reservada: ": process.memoryUsage(),
        "Path de ejecución: ": process.execPath,
        "Process id: ": process.pid,
        "Carpeta del proyecto: ": process.cwd(),
        "Puerto: ": index_1.puerto
    });
});
exports.default = router;
//# sourceMappingURL=info.js.map