import { Router } from 'express';
import paginaRouter from './pages/main';
import msg from './pages/msg';
import test from './pages/dev';
import info from './api/info';
import wsp from './api/wsp'
import apiMensajes from './api/mensajes';
import apiProductos from './api/productos';
import session from './api/session';

/* '
import apiProductos from './api/productos'
import session from './api/session'
import randoms from './api/randoms'; */

const router = Router();

router.use('/whatsapp', wsp);

//pages
router.use('/', paginaRouter);
router.use('/api/productos-test', test);

//apiREST
router.use('/msg', msg);
router.use('/info', info);
router.use('/api/mensajes', apiMensajes);
router.use('/api/productos', apiProductos);
router.use('/api', session);
/* router.use('/api', randoms); */

export default router;