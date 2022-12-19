import { login, validateLogIn } from '../../controllers/sessions';
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

function validateLogInApi(req: Request, res: Response, next: NextFunction) {
    if (validateLogIn(req)) {
        next()
    } else {
        throw createError(401, 'No estas autorizado!');
    }
}

router.get('/info', validateLogInApi, (req: Request, res: Response) => {
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
});

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
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