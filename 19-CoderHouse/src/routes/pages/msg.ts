import { Router } from 'express';
import { pageController } from '../../controllers';
import Handler from 'express-async-handler'
import { isLoggedInPage } from '../../middlewares/auth';

const router = Router();

router.get('/id',isLoggedInPage, Handler(pageController.userId));

export default router;