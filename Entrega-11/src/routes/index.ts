import { Router } from 'express';
import paginaRouter from './pages/main';
import test from './pages/dev';
import apiMensajes from './api/mensajes'
import apiProductos from './api/productos'

const router = Router();

//pages
router.use('/', paginaRouter);
router.use('/api/productos-test', test);

//apiREST
router.use('/api/mensajes', apiMensajes);
router.use('/api/productos', apiProductos);

export default router;