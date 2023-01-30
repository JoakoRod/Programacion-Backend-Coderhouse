"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosModel = exports.productosSchema = exports.productosCollectionName = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productosCollectionName = 'productos';
;
exports.productosSchema = new mongoose_1.default.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    descripcion: {
        type: String,
    },
    codigo: {
        type: Number,
        required: true,
        unique: true,
    },
    foto: {
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});
exports.productosModel = mongoose_1.default.model(exports.productosCollectionName, exports.productosSchema);
//# sourceMappingURL=productos.js.map