import Router from 'koa-router';
import { authController, pageController } from '../../controllers'
import { isLoggedInPage } from '../../middlewares/auth';

const router = new Router();

//Login, logout y signup
router.get('/login', authController.renderLogin);
router.post('/login', authController.authenticate);
router.post('/signUp', authController.signUp);
router.get('/logout', authController.logout);

//main
router.get('/', isLoggedInPage, pageController.load);
router.post('/', isLoggedInPage, pageController.guardarProducto);
router.get('/carrito', pageController.loadCarrito);
router.post('/carrito', pageController.compra);


export default router.routes();