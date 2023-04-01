import { isAdmin } from '../../middlewares/auth';
import { Router } from 'express';
import productController from '../../controllers/api/productos';
import Handler from 'express-async-handler';

const router = Router();

router.get('/', Handler(productController.getProduct));

router.get('/:categoria', Handler(productController.getProductByCategoria));

router.get('/:id', Handler(productController.getProduct));

router.post('/', isAdmin,  Handler(productController.addProduct));

router.put('/:id', isAdmin, Handler(productController.putProduct));

router.delete('/:id', isAdmin, Handler(productController.deleteProduct));

export default router;