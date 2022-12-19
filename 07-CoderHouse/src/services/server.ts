import express from 'express';
import http from 'http';
import mainRouter from '../routes/index';
import createError from 'http-errors';

const app = express();
const server = new http.Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

app.use('/api', mainRouter);

app.use((req, res, next) => {
    const ruta = req.path;
    const metodo = req.method;
    next(createError(501, `ruta '${ruta}' método '${metodo}' no implementada`));
})

app.use((err: { status: number; message: string; stack: string; }, req:express.Request, res:express.Response, next: any) => {
    const status = err.status || 500;
    const message = err.message || 'internal server err';

    res.status(status).json({
        message,
        stack: err.stack
    })
});

export default server;