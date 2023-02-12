import { Server } from "socket.io";
import { mensajesAPI, productosAPI, usersAPI } from '../api';
import { UserI } from '../models/users/users.interfaces'
import http from 'http';
import moment from "moment";

let io: Server;

let productosDao: productosAPI;
let messagesDao: mensajesAPI;
let usersDao: usersAPI;

productosAPI.getInstance().then((instance) => {
  productosDao = instance;
});

mensajesAPI.getInstance().then((instance) => {
  messagesDao = instance;
});

usersAPI.getInstance().then((instance) => {
  usersDao = instance;
});

export function initWsServer(server: http.Server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    //console.log('Nueva Conexion establecida!');

    socket.on('seAgregoProducto', async (producto) => {
      //console.log('se carga un producto');
      await productosDao.addProduct(producto);
      socket.broadcast.emit('agregarProducto', (producto));
    });

    socket.on('envioMSG', async (msg) => {
      //console.log('llego un mensaje!');
      //guardar mensaje
      messagesDao.addMessage(msg);
      const user: UserI | any = await usersDao.getUser(msg.user);

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

