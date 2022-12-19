const socketIo = require('socket.io');
const { ProductsController } = require('../controller/productos');
const { MensajesController } = require('../controller/mensajesProductos');
const moment = require('moment');
let io;

const initWsServer = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Nueva Conexion establecida!');

    socket.on('seAgregoProducto', async (producto) => {
      console.log('se carga un producto');
      await ProductsController.save(producto);
      socket.broadcast.emit('agregarProducto', (producto));
    });

    socket.on('envioMSG', async(data) => {
      console.log('llego un mensaje!');
      const now = moment().format("DD/MM/YYYY HH:mm:ss");
      data.fecha = now;

      //guardar mensaje
      MensajesController.save(data);

      //envio msj
      socket.broadcast.emit('recibioMSG', (data));
    })

  });

  return io;
};

const getWsServer = () => {
  return io;
}

module.exports = {
  initWsServer,
  getWsServer
};
