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
exports.getWsServer = exports.initWsServer = void 0;
const socket_io_1 = require("socket.io");
const productos_1 = require("../models/productos");
const mensajes_1 = require("../controllers/mensajes");
const moment_1 = __importDefault(require("moment"));
let io;
function initWsServer(server) {
    io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        //console.log('Nueva Conexion establecida!');
        socket.on('seAgregoProducto', (producto) => __awaiter(this, void 0, void 0, function* () {
            //console.log('se carga un producto');
            yield productos_1.productosModel.create(producto);
            socket.broadcast.emit('agregarProducto', (producto));
        }));
        socket.on('envioMSG', (data) => __awaiter(this, void 0, void 0, function* () {
            //console.log('llego un mensaje!');
            //guardar mensaje
            (0, mensajes_1.save)(data);
            data.fecha = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss");
            //envio msj
            socket.broadcast.emit('recibioMSG', (data));
        }));
    });
    return io;
}
exports.initWsServer = initWsServer;
function getWsServer() {
    return io;
}
exports.getWsServer = getWsServer;
//# sourceMappingURL=socket.js.map