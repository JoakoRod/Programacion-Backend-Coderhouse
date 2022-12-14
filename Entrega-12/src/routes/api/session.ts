import { login } from '../../controllers/sessions';
import { Router, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
const router = Router();

router.get('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (login(username, password, req)) {
            res.json({ msg: 'Bienvenido!!' })
        } else {
            throw createError(401, 'No estas autorizado!')
        }
    } catch (error) {
        next(error)
    }



})

/* const validateLogIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.info && req.session.info.loggedIn) next();
    else res.status(401).json({ msg: 'no estas autorizado' });
};

router.get('/info', validateLogIn, (req: any, res: Response) => {
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
}); */

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.send('Logout ok!');
        else res.send({ status: 'Logout ERROR', body: err });
    });
});

export default router;