import { Router, Request, Response, NextFunction } from 'express';
import { getAllPopulate } from '../../controllers/mensajes';
import createError from 'http-errors';
import passport from 'passport';
import { isLoggedInPage } from '../../middlewares/auth';
import { getAllProducts, saveProduct } from '../../controllers/productos';
import { mandarMail } from '../../services//email';
import multer from 'multer';
import config from '../../config/index';
import { mandarMsg, mandarWsp } from '../../services/twilio';
import moment from 'moment';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/avatars');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.email);
    }
});

const upload = multer({ storage: storage });

//const tableName = 'productos';
//const passportOptions = { failureRedirect: '/login' };

//Login, logout y signup
router.get('/login', (req: Request | any, res: Response, next: NextFunction) => {
    res.render('login', { layout: 'layoutLogin' });
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/errorLogin' }), (req: Request | any, res: Response, next: NextFunction) => {
    res.redirect('/');
})

router.post('/signUp', upload.single('avatar'), passport.authenticate('signup', { failureRedirect: '/errorSignUp' }),
    (req: Request | any, res: Response, next: NextFunction) => {
        mandarMail(config.user, 'nuevo registro', String(JSON.stringify(req.body, null, 2)));
        res.redirect('/');
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
router.get('/errorLogin', (req: Request | any, res: Response, next: NextFunction) => {
    try {
        res.render('error', { layout: 'error', error: 'Error en el login' });
    } catch (error) {
        next(error);
    }
});

router.get('/errorSignUp', (req: Request | any, res: Response, next: NextFunction) => {
    try {
        res.render('error', { layout: 'error', error: 'Error en la creacion de usuario' });
    } catch (error) {
        next(error);
    }
});

//main
router.get('/', isLoggedInPage, async (req: Request | any, res: Response, next: NextFunction) => {
    const mensajes: any = await getAllPopulate();
    mensajes.forEach((mensaje: any) => {
        mensaje.createdAt = moment(mensaje.createdAt).format("DD/MM/YYYY HH:mm:ss")
    });
    console.log(mensajes);
    try {
        const datos = {
            productos: await getAllProducts(),
            mostrar: true,
            ruta: '/',
            mensajes: mensajes,
            user: `${req.user.firstName} ${req.user.lastName}`,
            admin: req.user.role == 'admin'
        };
        if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
        res.render('carga_vista', datos);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const producto = req.body;
        await saveProduct(producto);

        res.redirect('/')

    } catch (error) {
        next(error);
    }
})

router.get('/carrito', async (req: Request, res: Response, next: NextFunction) => {
    //render pagina de carrito
})

router.post('/carrito', async (req: Request | any, res: Response, next: NextFunction) => {
    //realizar proceso de compra (encontrar los productos, restar stock y demas)
    mandarMail(config.user, `nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`, String(JSON.stringify(req.body, null, 2)));
    mandarWsp(`nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`);
    mandarMsg('Su pedido ha sido reccibido y sera enviado a la brevedad', req.user.phone)
    res.send({ msg: "ok" });
})

export default router;