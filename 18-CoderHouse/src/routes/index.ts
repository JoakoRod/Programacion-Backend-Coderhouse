import { Router } from 'express';
import paginaRouter from './pages/main';
import test from './pages/dev';
import apiMensajes from './api/mensajes'
import apiProductos from './api/productos'
import session from './api/session'
import info from './api/info';
import randoms from './api/randoms';

const router = Router();

//pages
router.use('/', paginaRouter);
router.use('/api/productos-test', test);

//apiREST
router.use('/api/mensajes', apiMensajes);
router.use('/api/productos', apiProductos);
router.use('/api', session);
router.use('/api', randoms);
router.use(info);

export default router;