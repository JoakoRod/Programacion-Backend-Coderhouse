import { Server } from "socket.io";
import { createKnex } from '../controllers/knex';
import http from 'http';
import { normalizar, save } from "../controllers/mensajes";

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
      //guardar mensaje
      save(data);

      //envio msj
      const dataNormalizada = normalizar(data);
      socket.broadcast.emit('recibioMSG', (dataNormalizada));
    });

  });

  return io;
}

export function getWsServer() {
  return io;
}

