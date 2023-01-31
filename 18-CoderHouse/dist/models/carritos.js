"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritosModel = exports.carritosSchema = exports.carritosCollectionName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productos_1 = require("./productos");
exports.carritosCollectionName = 'carritos';
exports.carritosSchema = new mongoose_1.default.Schema({
    productos: { type: [productos_1.productosSchema], required: false },
});
exports.carritosModel = mongoose_1.default.model(exports.carritosCollectionName, exports.carritosSchema);
//# sourceMappingURL=carritos.js.map