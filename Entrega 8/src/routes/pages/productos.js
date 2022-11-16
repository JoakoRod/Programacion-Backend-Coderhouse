const express = require('express');
const { ProductsController } = require('../../controller/productos');
const { getWsServer } = require('../../services/socket');
const router = express.Router();
const { MensajesController } = require('../../controller/mensajesProductos');

//La entrega anterior
/* router.get('/productos', async (req, res) => {
  const datos = {
    productos: await ProductsController.getAll(),
    mostrar: true
  };

  if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
  res.render('vista', datos);
});

router.get('/carga', (req, res,) => {
  res.render('carga', {ruta: '/productos'})
});

router.post('/productos', async (req, res, next) => {
  try {
    const product = req.body;
    const id = await ProductsController.save(product);

    res.redirect('/')

  } catch (error) {
    next(error);
  }

}); */

router.get('/', async (req, res) => {
  const datos = {
    productos: await ProductsController.getAll(),
    mostrar: true,
    ruta: '/',
    mensajes: await MensajesController.getAll()
  };

  if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;

  const wsServer = getWsServer();
  //console.log(wsServer);
  wsServer.emit('message', datos);
  res.render('carga_vista', datos);
});

router.post('/', async (req, res, next) => {
  try {
    const product = req.body;
    const id = await ProductsController.save(product);

    res.redirect('/')

  } catch (error) {
    next(error);
  }
})

module.exports = router