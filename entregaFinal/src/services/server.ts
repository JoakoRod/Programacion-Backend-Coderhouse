import express, { ErrorRequestHandler } from 'express';
import http from 'http';
import mainRouter from '../routes';
import Logger from './logger';

//crear el servidor
const app = express();
const server = new http.Server(app); //Necesario para poder usar io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use(mainRouter);

//rutas no existentes
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ruta = req.path;
    const metodo = req.method;
    Logger.warn(`Se intento acceder a ${ruta} con el metodo ${metodo}`);
})

//errores
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    Logger.error(`HUBO UN ERROR ${err.message}`);
    const status = err.statusCode || 500;
    const msg = err.message || 'Internal Server Error';
    const stack = err.stack;
    Logger.error(err);
    res.status(status).send({ msg, stack });
};

app.use(errorHandler);

export default server;