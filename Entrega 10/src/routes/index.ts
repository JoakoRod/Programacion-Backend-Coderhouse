import {Router} from 'express';
import productosRouter from './productos'
import carritoRouter from './carrito' 

const router = Router();

router.use('/productos', productosRouter);
router.use('/carrito', carritoRouter);


export default router;
