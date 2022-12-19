import { Router, Request, Response, NextFunction } from 'express';
import * as productosController from '../../controllers/knex';
import { getAllNormal } from '../../controllers/mensajes';
/* import { getWsServer } from '../../services/socket' */
const router = Router();

const tableName = 'productos';

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const datos = {
            productos: await productosController.getKnex(tableName),
            mostrar: true,
            ruta: '/',
            mensajes: await getAllNormal()
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