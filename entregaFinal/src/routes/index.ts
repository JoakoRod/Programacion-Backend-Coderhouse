import { Router } from 'express';
import productos from './productos';
import auth from './page/auth';
import authApi from './api/session';
import apiProductos from './api/productos';
import apiMensajes from './api/mensajes'

const router = Router();

 //page
router.use('/', auth)
router.use('/productos', productos);

//api
router.use('/api', authApi);
router.use('/api/productos', apiProductos);
router.use('/api/chat', apiMensajes);

export default router;