const express = require('express');
const routerProductos = require('./productos');

const router = express.Router();
router.use('/', routerProductos);
module.exports = router