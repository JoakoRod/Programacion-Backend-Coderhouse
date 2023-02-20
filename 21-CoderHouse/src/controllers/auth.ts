import { Request, Response, NextFunction } from 'express'
import passport from 'passport';
import createError from 'http-errors';
import { mandarMail } from '../services/email';
import config from '../config';

const renderLogin = (req: Request, res: Response) => {
    res.render('login', { layout: 'layoutLogin' });
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) return res.status(401).render('error', { layout: 'error', error: 'Error en el login' });
        req.logIn(user, function (err) {
            return res.redirect('/');
        });
    })(req, res, next);
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('signup', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) return res.status(401).render('error', { layout: 'error', error: 'Error en la creacion de usuario' });
        mandarMail(config.user, 'nuevo registro', String(JSON.stringify(req.body, null, 2)));
        return res.redirect('/');
    })(req, res, next);
}

const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            if (!err) res.redirect('/');
            else throw createError(500, 'Logout ERROR')
        });
    } catch (error) {
        next(error)
    }
}

export default {
    renderLogin,
    authenticate,
    signUp,
    logout
}