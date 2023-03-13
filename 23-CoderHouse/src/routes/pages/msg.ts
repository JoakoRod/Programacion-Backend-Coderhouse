import Router from 'koa-router';
import { pageController } from '../../controllers';
import { isLoggedInPage } from '../../middlewares/auth';

const router = new Router();

router.get('/id',isLoggedInPage, pageController.userId);

export default router.routes();