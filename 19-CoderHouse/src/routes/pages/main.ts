import { Router } from 'express';
import multer from 'multer';
import { authController, pageController } from '../../controllers'
import Handler from 'express-async-handler';
import { isLoggedInPage } from '../../middlewares/auth';

const router = Router();

//multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/avatars');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.email);
    }
});

const upload = multer({ storage: storage });


//Login, logout y signup
router.get('/login', Handler(authController.renderLogin));
router.post('/login', Handler(authController.authenticate));
router.post('/signUp', upload.single('avatar'), Handler(authController.signUp));
router.get('/logout', Handler(authController.logout));

//main
router.get('/', isLoggedInPage, Handler(pageController.load));
router.post('/', Handler(pageController.guardarProducto));
router.get('/carrito', Handler(pageController.loadCarrito));
router.post('/carrito', Handler(pageController.compra));

//errores
/* router.get('/errorLogin', (req: Request | any, res: Response, next: NextFunction) => {
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
}); */

export default router;