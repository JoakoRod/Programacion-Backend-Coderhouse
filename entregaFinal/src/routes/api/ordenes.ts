import { Router } from 'express';
import Handler from 'express-async-handler';
import { isAdmin, isLoggedIn } from '../../middlewares/auth';
import ordenesController from '../../controllers/api/ordenes';

const router = Router();

router.get('/', isLoggedIn, Handler(ordenesController.getOrden));

router.get('/:id', isLoggedIn, Handler(ordenesController.getOrden));

router.post('/', isLoggedIn, Handler(ordenesController.addOrden));

router.put('/:id', isAdmin, Handler(ordenesController.putOrden));

router.delete('/:id', isAdmin, Handler(ordenesController.deleteOrden));

export default router;