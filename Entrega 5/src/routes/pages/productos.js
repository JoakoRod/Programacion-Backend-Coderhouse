const express = require('express');
const { ProductsController } = require('../../controller/productos');
const router = express.Router();

router.get('/productos', async (req, res) => {
  const datos = {
    productos: await ProductsController.getAll(),
    mostrar: true
  };

  if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
  res.render('vista', datos);
});

router.get('/', (req, res,) => {
  res.render('carga')
});

router.post('/productos', async (req, res, next) => {
  try {
    const product = req.body;
    const id = await ProductsController.save(product);

    res.redirect('/')

  } catch (error) {
    next(error);
  }

});

module.exports = router