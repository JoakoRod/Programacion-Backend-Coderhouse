import { Router, Request, Response, NextFunction } from 'express';
import { getAllNormal } from '../../controllers/mensajes';
import createError from 'http-errors';
import passport from 'passport';
import { isLoggedInPage } from '../../middlewares/auth';
import { logger } from '../../services/logger';
import { productosModel } from '../../models/productos';
import multer from 'multer';
const upload = multer({ dest: '../../../public/avatars' })

const router = Router();

//const tableName = 'productos';
//const passportOptions = { failureRedirect: '/login' };

//Login, logout y signup
router.get('/login', (req: Request | any, res: Response, next: NextFunction) => {
    logger.info('GET /login');
    res.render('login', { layout: 'layoutLogin' });
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/errorLogin' }),
    (req: Request | any, res: Response, next: NextFunction) => {
        logger.info('POST /login');
        res.redirect('/');
    })

router.post('/signUp', passport.authenticate('signup', { failureRedirect: '/errorSignUp' }), (req: Request | any, res: Response, next: NextFunction) => {
    logger.info('POST /signUp');
    res.redirect('/');
})

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    logger.info('GET /logout');
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
router.get('/errorLogin', (req: Request | any, res: Response, next: NextFunction) => {
    logger.info('GET /errorLogin');
    try {
        res.render('error', { layout: 'error', error: 'Error en el login' });
    } catch (error) {
        next(error);
    }
});

router.get('/errorSignUp', (req: Request | any, res: Response, next: NextFunction) => {
    logger.info('GET /errorSignUp');
    try {
        res.render('error', { layout: 'error', error: 'Error en la creacion de usuario' });
    } catch (error) {
        next(error);
    }
});

//main
router.get('/', isLoggedInPage, async (req: Request | any, res: Response, next: NextFunction) => {
    logger.info('GET /');
    try {
        const datos = {
            productos: await productosModel.find().lean(),
            mostrar: true,
            ruta: '/',
            mensajes: await getAllNormal(),
            user: `${req.user.firstName} ${req.user.lastName}`
        };

        if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
        res.render('carga_vista', datos);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    logger.info('POST /');
    try {
        const producto = req.body;
        await productosModel.create(producto);

        res.redirect('/')

    } catch (error) {
        next(error);
    }
})

export default router;