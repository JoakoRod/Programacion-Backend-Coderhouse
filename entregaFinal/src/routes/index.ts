import { Router } from 'express';
import auth from './page/auth';
import pageMain from './page/main'
import authApi from './api/session';
import apiProductos from './api/productos';
import apiMensajes from './api/mensajes';
import apiCarritos from './api/carritos';
import apiOrdenes from './api/ordenes';
import msg from './page/msg';

const router = Router();

 //page
router.use('/', auth)
router.use('/productos', pageMain)
router.use('/msg', msg)

//api
router.use('/api', authApi);
router.use('/api/productos', apiProductos);
router.use('/api/chat', apiMensajes);
router.use('/api/carrito', apiCarritos)
router.use('/api/ordenes', apiOrdenes)

export default router;