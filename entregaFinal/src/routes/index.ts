import { Router } from 'express';
import auth from './page/auth';
import authApi from './api/session';
import apiProductos from './api/productos';
import apiMensajes from './api/mensajes';
import apiCarrito from './api/carrito';

const router = Router();

 //page
router.use('/', auth)

//api
router.use('/api', authApi);
router.use('/api/productos', apiProductos);
router.use('/api/chat', apiMensajes);
router.use('/api/carrito', apiCarrito)

export default router;