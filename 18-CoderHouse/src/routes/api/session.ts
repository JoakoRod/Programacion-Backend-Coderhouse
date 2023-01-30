import { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import passport from 'passport';
import { isLoggedIn } from '../../middlewares/auth';
import { logger } from '../../services/logger';
const router = Router();

router.post('/login', passport.authenticate('login'), async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /api/login');
    try {
        res.json({ msg: 'Bienvenido!!' })
    } catch (error) {
        next(error)
    }
})

router.post('/signup', passport.authenticate('signup'), async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /api/signup');
    try {
        res.json({ msg: 'Bienvenido!!' })
    } catch (error) {
        next(error)
    }
})

router.get('/info', isLoggedIn, (req: Request, res: Response) => {
    logger.info('GET /api/info');
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /api/logout');
    try {
        req.session.destroy((err) => {
            if (!err) res.send('Logout ok!');
            else throw createError(500, 'Logout ERROR')
        });
    } catch (error) {
        next(error)
    }
});

export default router;