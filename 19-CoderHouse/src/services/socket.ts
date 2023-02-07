import { Server } from "socket.io";
import { saveProduct } from '../controllers/productos';
import http from 'http';
import { save } from "../controllers/mensajes";
import moment from "moment";
import { UserModel, Iuser } from "../models/usuarios";

let io: Server;

export function initWsServer(server: http.Server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    //console.log('Nueva Conexion establecida!');

    socket.on('seAgregoProducto', async (producto) => {
      //console.log('se carga un producto');
      await saveProduct(producto);
      socket.broadcast.emit('agregarProducto', (producto));
    });

    socket.on('envioMSG', async (msg) => {
      //console.log('llego un mensaje!');
      //guardar mensaje
      save(msg);
      const user: Iuser | any = await UserModel.findById(msg.user);
      
      const res = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        date: moment().format("DD/MM/YYYY HH:mm:ss"),
        msg: msg.text
      };

      //envio msj A TODOS
      io.emit('recibioMSG', (res));
    });

  });

  return io;
}

export function getWsServer() {
  return io;
}

