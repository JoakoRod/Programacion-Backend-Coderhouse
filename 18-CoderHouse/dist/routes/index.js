"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("./pages/main"));
const dev_1 = __importDefault(require("./pages/dev"));
const mensajes_1 = __importDefault(require("./api/mensajes"));
const productos_1 = __importDefault(require("./api/productos"));
const session_1 = __importDefault(require("./api/session"));
const info_1 = __importDefault(require("./api/info"));
const randoms_1 = __importDefault(require("./api/randoms"));
const wsp_1 = __importDefault(require("./wsp"));
const router = (0, express_1.Router)();
router.use('/whatsapp', wsp_1.default);
//pages
router.use('/', main_1.default);
router.use('/api/productos-test', dev_1.default);
//apiREST
router.use('/api/mensajes', mensajes_1.default);
router.use('/api/productos', productos_1.default);
router.use('/api', session_1.default);
router.use('/api', randoms_1.default);
router.use(info_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map