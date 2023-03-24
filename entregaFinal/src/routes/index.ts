import { Router } from 'express';
import productos from './productos';
/* import mensajes from './mensajes';
import carrito from './carrito'; */


const router = Router();

router.use('/productos', productos);
/* router.use('/mensajes', mensajes);
router.use('/carrito', carrito); */

export default router;