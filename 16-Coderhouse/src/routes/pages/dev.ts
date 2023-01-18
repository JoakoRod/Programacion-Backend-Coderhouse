import { Router } from 'express';
import { getProductos } from '../../controllers/productosFaker';
import { logger } from '../../services/logger';
/* import { getWsServer } from '../../services/socket' */
const router = Router();

router.get('/', async (req, res) => {
    logger.info('GET /api/productos-test/')
    const datos = {
        productos: getProductos(),
        mostrar: true,
        ruta: '/',
        mensajes: null //agregar
    };

    if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;

    /* const wsServer = getWsServer();
    console.log(wsServer);
    wsServer.emit('message', datos); */

    res.render('carga_vista_dev', datos);
});

export default router;