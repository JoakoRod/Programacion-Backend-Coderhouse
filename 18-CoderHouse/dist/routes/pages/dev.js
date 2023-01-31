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
const productosFaker_1 = require("../../controllers/productosFaker");
/* import { getWsServer } from '../../services/socket' */
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = {
        productos: (0, productosFaker_1.getProductos)(),
        mostrar: true,
        ruta: '/',
        mensajes: null //agregar
    };
    if (!Array.isArray(datos.productos) || datos.productos.length === 0)
        datos.mostrar = false;
    res.render('carga_vista_dev', datos);
}));
exports.default = router;
//# sourceMappingURL=dev.js.map