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
exports.leerDenormalizadoDesdeArchivo = exports.escribirNormalizado = exports.normalizar = exports.save = exports.getAllPopulate = exports.getAllNormal = exports.getAll = void 0;
const mensajes_1 = require("../models/mensajes");
const normalizr_1 = require("normalizr");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
//import * as util from 'util';
const jsonMensajes = path_1.default.join(__dirname, '../data/mensajesNormalizados.json');
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const mensajes = normalizar(yield mensajes_1.mensajesModel.find().lean());
        //console.log(util.inspect(mensajes, true, 3, true));
        return mensajes;
    });
}
exports.getAll = getAll;
function getAllNormal() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mensajes_1.mensajesModel.find().lean();
    });
}
exports.getAllNormal = getAllNormal;
function getAllPopulate() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mensajes_1.mensajesModel.find().populate('user').lean();
    });
}
exports.getAllPopulate = getAllPopulate;
function save(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mensajes_1.mensajesModel.create(msg);
    });
}
exports.save = save;
function normalizar(data) {
    const user = new normalizr_1.schema.Entity('authors', {}, { idAttribute: 'id' });
    const msg = new normalizr_1.schema.Entity('messages', { author: user });
    const msgSchema = new normalizr_1.schema.Array({
        author: user,
        text: [msg]
    });
    const dataNormalizada = (0, normalizr_1.normalize)(data, msgSchema);
    return dataNormalizada;
}
exports.normalizar = normalizar;
function escribirNormalizado() {
    return __awaiter(this, void 0, void 0, function* () {
        const mensajesNormalizados = yield getAll();
        fs_1.default.writeFileSync(jsonMensajes, JSON.stringify(mensajesNormalizados, null, 2));
    });
}
exports.escribirNormalizado = escribirNormalizado;
function leerDenormalizadoDesdeArchivo() {
    return __awaiter(this, void 0, void 0, function* () {
        const author = new normalizr_1.schema.Entity('authors', {});
        const text = new normalizr_1.schema.Entity('text', { author: author });
        const finalSchema = new normalizr_1.schema.Array(text);
        const data = JSON.parse(fs_1.default.readFileSync(jsonMensajes).toString());
        const dataDenormalizada = (0, normalizr_1.denormalize)(data.result, finalSchema, data.entities);
        return dataDenormalizada;
    });
}
exports.leerDenormalizadoDesdeArchivo = leerDenormalizadoDesdeArchivo;
//# sourceMappingURL=mensajes.js.map