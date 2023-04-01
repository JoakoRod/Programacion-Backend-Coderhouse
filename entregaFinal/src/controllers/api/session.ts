import { Request, Response, NextFunction } from 'express'
import {ApiError, ErrorStatus} from '../../services/error'

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
            else throw new ApiError('Logout ERROR', ErrorStatus.InternalServerError)
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
};