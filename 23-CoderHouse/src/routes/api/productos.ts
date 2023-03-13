import { isAdmin } from '../../middlewares/auth';
import Router from 'koa-router';
import productController from '../../controllers/api/productos';
import Handler from 'express-async-handler';

const router = new Router();

router.get('/', productController.getProduct);

router.get('/:id', productController.getProduct);

router.post('/', isAdmin,  productController.addProduct);

router.put('/:id', isAdmin, productController.putProduct);

router.delete('/:id', isAdmin, productController.deleteProduct);

export default router.routes();