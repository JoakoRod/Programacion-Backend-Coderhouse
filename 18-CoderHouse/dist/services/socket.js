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
const productos_1 = require("../controllers/productos");
const mensajes_1 = require("../controllers/mensajes");
const moment_1 = __importDefault(require("moment"));
const usuarios_1 = require("../models/usuarios");
let io;
function initWsServer(server) {
    io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        //console.log('Nueva Conexion establecida!');
        socket.on('seAgregoProducto', (producto) => __awaiter(this, void 0, void 0, function* () {
            //console.log('se carga un producto');
            yield (0, productos_1.saveProduct)(producto);
            socket.broadcast.emit('agregarProducto', (producto));
        }));
        socket.on('envioMSG', (msg) => __awaiter(this, void 0, void 0, function* () {
            //console.log('llego un mensaje!');
            //guardar mensaje
            (0, mensajes_1.save)(msg);
            const user = yield usuarios_1.UserModel.findById(msg.user);
            const res = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                date: (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss"),
                msg: msg.text
            };
            //envio msj A TODOS
            io.emit('recibioMSG', (res));
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