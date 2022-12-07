import { Router } from 'express';
import * as productosController from '../../controllers/knex';
import { getWsServer } from '../../services/socket'
const router = Router();

const tableName = 'productos';

router.get('/', async (req, res) => {
    const datos = {
        productos: await productosController.getKnex(tableName),
        mostrar: true,
        ruta: '/',
        mensajes: null //agregar
    };

    if (!Array.isArray(datos.productos) || datos.productos.length === 0) datos.mostrar = false;

    const wsServer = getWsServer();
    //console.log(wsServer);
    //wsServer.emit('message', datos);
    res.render('carga_vista', datos);
});

router.post('/', async (req, res, next) => {
    try {
        const producto = req.body;
        const id = await productosController.createKnex(tableName, producto);

        res.redirect('/')

    } catch (error) {
        next(error);
    }
})

export default router;