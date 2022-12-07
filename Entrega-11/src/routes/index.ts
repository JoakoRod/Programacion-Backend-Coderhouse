import { Router } from 'express';
import paginaRouter from './pages/main';
import test from './pages/dev';

const router = Router();

router.use('/', paginaRouter);
router.use('/api/productos-test', test);

export default router;