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
exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../config/index"));
//import knex from 'knex';
mongoose_1.default.set('strictQuery', true);
function initMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('conectando a la db');
            yield mongoose_1.default.connect(index_1.default.MONGO_ATLAS_URL);
            console.log('conexion funcionando!');
        }
        catch (error) {
            console.log(`Error => ${error}`);
            return error;
        }
    });
}
exports.initMongoDB = initMongoDB;
/*
export const connectionProducts = knex(config.SQL_CONNECTION);

export function initKnex() {
    connectionProducts.schema.hasTable('productos').then((exists) => {
        if (exists) return;
        console.log('Creamos la tabla productos!');

        return connectionProducts.schema.createTable('productos', async (productosTable) => {
            productosTable.increments('id').primary();
            productosTable.string('nombre').notNullable();
            productosTable.text('descripcion');
            productosTable.float('codigo').notNullable();
            productosTable.text('foto');
            productosTable.float('precio').notNullable();
            productosTable.bigInteger('stock').notNullable();
        });
    });
}; */
//# sourceMappingURL=database.js.map