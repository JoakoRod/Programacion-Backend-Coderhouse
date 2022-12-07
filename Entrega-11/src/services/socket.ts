import { Server } from "socket.io";
import { createKnex } from '../controllers/knex';
import moment from 'moment';
import http from 'http';

let io: Server;

export function initWsServer(server: http.Server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    socket.on('seAgregoProducto', async (producto) => {
      console.log('se carga un producto');
      await createKnex('productos', producto);
      socket.broadcast.emit('agregarProducto', (producto));
    });

    socket.on('envioMSG', async (data) => {
      console.log('llego un mensaje!');
      const now = moment().format("DD/MM/YYYY HH:mm:ss");
      data.fecha = now;

      //guardar mensaje
      //MensajesController.save(data);

      //envio msj
      socket.broadcast.emit('recibioMSG', (data));
    });

  });

  return io;
}

export function getWsServer() {
  return io;
}

