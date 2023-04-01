import { Router } from 'express';
import multer from 'multer';
import authController from '../../controllers/view/auth';
import Handler from 'express-async-handler';

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

//rutas
router.get('/', Handler(authController.renderLogin));
router.post('/', Handler(authController.authenticate));
router.post('/signUp', upload.single('avatar'), Handler(authController.signUp));
router.get('/logout', Handler(authController.logout));

export default router;