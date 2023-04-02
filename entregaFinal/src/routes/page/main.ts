import { Router } from 'express';
import Handler from 'express-async-handler';
import { isLoggedInPage } from '../../middlewares/auth';
import pageController from '../../controllers/view/pageMain'

const router = Router();

//main
router.get('/', isLoggedInPage, Handler(pageController.load));
router.post('/', isLoggedInPage, Handler(pageController.guardarProducto));
router.post('/orden', isLoggedInPage, Handler(pageController.compra));

export default router;