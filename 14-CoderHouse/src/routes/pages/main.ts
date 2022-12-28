import { Router, Request, Response, NextFunction } from 'express';
import * as productosController from '../../controllers/knex';
import { getAllNormal } from '../../controllers/mensajes';
import createError from 'http-errors';
import passport from 'passport';
import { isLoggedInPage } from '../../middlewares/auth';

const router = Router();

const tableName = 'productos';
//const passportOptions = { failureRedirect: '/login' };

//Login, logout y signup
router.get('/login', (req: Request | any, res: Response, next: NextFunction) => {
    res.render('login', { layout: 'layoutLogin' });
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/errorLogin'} ), (req: Request | any, res: Response, next: NextFunction) => {
    res.redirect('/');
})

router.post('/signUp',passport.authenticate('signup', { failureRedirect: '/errorSignUp'} ), (req: Request | any, res: Response, next: NextFunction) => {
    res.render('login', { layout: 'layoutLogin' });
})

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            if (!err) res.redirect('/');
            else throw createError(500, 'Logout ERROR')
        });
    } catch (error) {
        next(error)
    }
});

//errores
router.get('/errorLogin',  (req: Request | any, res: Response, next: NextFunction) => {
    try {
        res.render('error', {layout: 'error', error: 'Error en el login'});
    } catch (error) {
        next(error);
    }
});

router.get('/errorSignUp',  (req: Request | any, res: Response, next: NextFunction) => {
    try {
        res.render('error', {layout: 'error', error: 'Error en la creacion de usuario'});
    } catch (error) {
        next(error);
    }
});

//main
router.get('/', isLoggedInPage, async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const datos = {
            productos: await productosController.getKnex(tableName),
            mostrar: true,
            ruta: '/',
            mensajes: await getAllNormal(),
            user: req.user.username
        };

        if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;

        /* const wsServer = getWsServer();
        console.log(wsServer);
        wsServer.emit('message', datos); */
        res.render('carga_vista', datos);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const producto = req.body;
        await productosController.createKnex(tableName, producto);

        res.redirect('/')

    } catch (error) {
        next(error);
    }
})

export default router;