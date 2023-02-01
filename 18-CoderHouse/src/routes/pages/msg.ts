import { Router, Request, Response, NextFunction } from 'express';
import { isLoggedInPage } from '../../middlewares/auth';
const router = Router();

router.get('/id', isLoggedInPage, async (req: Request | any, res: Response, next: NextFunction) => {
    res.send(req.user._id);
})

export default router;