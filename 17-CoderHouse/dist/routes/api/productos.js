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
const productos_1 = require("../../models/productos");
const auth_1 = require("../../middlewares/auth");
const express_1 = require("express");
const logger_1 = require("../../services/logger");
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('GET /api/productos/');
    try {
        const data = yield productos_1.productosModel.find().lean();
        (data === null || data === void 0 ? void 0 : data.length) != 0 ? res.json(data) : res.json({ msg: 'No se encontraron productos' });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('GET /api/productos/:id');
    try {
        const id = req.params.id;
        const data = yield productos_1.productosModel.findById(id);
        data ? res.json(data) : res.json({ msg: 'No se encontro ningun producto con el id ingresado' });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', auth_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('POST /api/productos/');
    try {
        const product = req.body;
        yield productos_1.productosModel.create(product);
        res.json({ msg: 'ok' });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', auth_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('PUT /api/productos/:id');
    try {
        const id = req.params.id;
        const product = req.body;
        yield productos_1.productosModel.findOneAndUpdate({ _id: id }, product);
        res.json({ msg: 'ok' });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', auth_1.isAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info('DELETE /api/productos/:id');
    try {
        const id = req.params.id;
        yield productos_1.productosModel.deleteOne({ _id: id });
        res.json({ msg: 'ok' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=productos.js.map