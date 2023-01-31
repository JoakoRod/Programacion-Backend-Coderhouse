import { Server } from "socket.io";
import { saveProduct } from '../controllers/productos';
import http from 'http';
import { save } from "../controllers/mensajes";
import moment from "moment";

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

    socket.on('envioMSG', async (data) => {
      //console.log('llego un mensaje!');
      //guardar mensaje
      save(data);

      data.fecha = moment().format("DD/MM/YYYY HH:mm:ss");
      //envio msj
      socket.broadcast.emit('recibioMSG', (data));
    });

  });

  return io;
}

export function getWsServer() {
  return io;
}

