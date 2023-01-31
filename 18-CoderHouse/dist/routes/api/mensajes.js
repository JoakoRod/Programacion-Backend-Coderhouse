"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mensajes_1 = require("../../controllers/mensajes");
const router = (0, express_1.Router)();
router.get('/normalizado', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mensajesNormalizados = yield (0, mensajes_1.getAll)();
        res.json(mensajesNormalizados);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/denormalizado', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mensajes = yield (0, mensajes_1.getAllNormal)();
        res.json(mensajes);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/normalizarEnArchivo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mensajes_1.escribirNormalizado)();
        res.json({ msg: 'ok' });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/denormalizarDesdeArchivo', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield (0, mensajes_1.leerDenormalizadoDesdeArchivo)());
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msg = req.body;
        yield (0, mensajes_1.save)(msg);
        res.json({ msg: 'ok' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=mensajes.js.map