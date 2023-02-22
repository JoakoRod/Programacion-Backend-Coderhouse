import { productosAPI } from '../../api';
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors';

const login = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: 'Bienvenido!!' });
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ msg: 'Bienvenido!!' });
};

const info = async (req: Request, res: Response, next: NextFunction) => {
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            if (!err) res.send('Logout ok!');
            else throw createError(500, 'Logout ERROR')
        });
    } catch (error) {
        next(error)
    }
};



export default {
    login,
    signUp,
    info,
    logout
}