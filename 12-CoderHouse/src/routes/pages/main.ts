import { Router, Request, Response, NextFunction } from 'express';
import * as productosController from '../../controllers/knex';
import { getAllNormal } from '../../controllers/mensajes';
import { validateLogIn, login } from '../../controllers/sessions'
import createError from 'http-errors';
/* import { getWsServer } from '../../services/socket' */
const router = Router();

const tableName = 'productos';

function middlewareLogIn(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.query
    if (username && password) {
        login(username.toString(), password.toString(), req);
        res.redirect('/'); //no es necesario, pero de esta manera el usuario y contraseña no quedan en la URL
    }
    if (validateLogIn(req)) {
        next()
    } else {
        res.render('login', { layout: 'layoutLogin' })
    }
}

router.get('/', middlewareLogIn, async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const datos = {
            productos: await productosController.getKnex(tableName),
            mostrar: true,
            ruta: '/',
            mensajes: await getAllNormal(),
            nombre: req.session.info.username.toString()
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

router.get('/logout', middlewareLogIn, (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy((err) => {
            if (!err) res.redirect('/');
            else throw createError(500, 'Logout ERROR')
        });
    } catch (error) {
        next(error)
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