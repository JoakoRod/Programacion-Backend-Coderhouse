import { Router } from 'express';
import Handler from 'express-async-handler';
import { isAdmin, isLoggedIn } from '../../middlewares/auth';
import carritoController from '../../controllers/api/carritos';

const router = Router();

router.get('/', isLoggedIn, Handler(carritoController.getCarrito));

router.post('/crearCarrito', isLoggedIn, Handler(carritoController.addCarrito));

router.post('/:idProducto/:cantidad', isLoggedIn, Handler(carritoController.addProducto));

router.put('/', isLoggedIn, Handler(carritoController.putCarrito));

router.delete('/', isLoggedIn, Handler(carritoController.deleteCarrito));

export default router;