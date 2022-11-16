const express = require('express');
const { ProductsController } = require('../../controller/productos');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({
    msg: await ProductsController.getAll()
  })
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await ProductsController.getById(id);

    res.json({
      msg: product
    });

  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = req.body;

    const id = await ProductsController.save(product);

    res.json({
      id: id
    });

  } catch (error) {
    next(error);
  }

  /* Para probar:
    {
      "title": "Pulsera",
      "price": 34.12,
      "thumbnail": "https: //fotoDeUnaPulsera.png"
    }
   */
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = req.body;
    await ProductsController.findByIdAndUptade(id, product);
    res.json({
      msg: 'Guardado Correctamente'
    });
  } catch (error) {
    next(error);
  }

});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await ProductsController.findByIdAndDelete(id);
    res.json({
      msg: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }

});

module.exports = router