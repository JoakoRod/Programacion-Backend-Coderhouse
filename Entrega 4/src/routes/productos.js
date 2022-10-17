const express = require('express');
//const { v4: uuidv4 } = require('uuid');

/**
 * DATOS A MANIPULAR
 */
let mascotas = [];

const router = express.Router();

router.get('/', (req, res) => {
  //validar que el usuario este logueado
  res.json({
    mascotas,
  });
});

module.exports = router