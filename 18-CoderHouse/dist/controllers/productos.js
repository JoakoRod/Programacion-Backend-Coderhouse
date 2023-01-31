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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveProduct = exports.getAllProducts = void 0;
const productos_1 = require("../models/productos");
const http_errors_1 = __importDefault(require("http-errors"));
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield productos_1.productosModel.find().lean();
        }
        catch (error) {
            throw (0, http_errors_1.default)(500, `error con la db ${error}`);
        }
    });
}
exports.getAllProducts = getAllProducts;
function saveProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield productos_1.productosModel.create(product);
        }
        catch (error) {
            throw (0, http_errors_1.default)(500, `error con la db ${error}`);
        }
    });
}
exports.saveProduct = saveProduct;
//# sourceMappingURL=productos.js.map