const express = require('express');
const routerProductos = require('./productos');

const router = express.Router();

router.use('/productos', routerProductos);

module.exports = router