const express = require('express');
const routerMascotas = require('./productos');

const router = express.Router();

router.use('/productos', routerMascotas);

module.exports = router