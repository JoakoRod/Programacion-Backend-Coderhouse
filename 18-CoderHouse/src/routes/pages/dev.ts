import { Router } from 'express';
import { getProductos } from '../../controllers/productosFaker';
/* import { getWsServer } from '../../services/socket' */
const router = Router();

router.get('/', async (req, res) => {
    const datos = {
        productos: getProductos(),
        mostrar: true,
        ruta: '/',
        mensajes: null //agregar
    };

    if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;
    res.render('carga_vista_dev', datos);
});

export default router;