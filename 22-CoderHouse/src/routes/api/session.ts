import { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import passport from 'passport';
import { isLoggedIn } from '../../middlewares/auth';
import sessionController from '../../controllers/api/session'

const router = Router();

router.post('/login', passport.authenticate('login'), sessionController.login)

router.post('/signup', passport.authenticate('signup'), sessionController.signUp)

router.get('/info', isLoggedIn, sessionController.info);

router.post('/logout', sessionController.logout);

export default router;