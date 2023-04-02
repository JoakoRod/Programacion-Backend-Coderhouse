import { Router } from 'express';
import pageController from '../../controllers/view/pageMain';
import Handler from 'express-async-handler'
import { isLoggedInPage } from '../../middlewares/auth';

const router = Router();

router.get('/id',isLoggedInPage, Handler(pageController.userId));

export default router;