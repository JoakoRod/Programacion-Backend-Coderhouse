import express, { ErrorRequestHandler } from 'express';
import http from 'http';
import mainRouter from '../routes';
import Logger from './logger';
import { signUpFunc, loginFunc } from './auth';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import config from '../config';
import cors from 'cors';
import multer from 'multer';

const upload = multer({ dest: './public/avatars/' });

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,
        /* crypto: {
            secret: config.secret2,
        }, */
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600 * 1000,
    },
};

//crear el servidor
const app = express();
const server = new http.Server(app); //Necesario para poder usar io

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session
app.use(session(StoreOptions));

//cors
const whiteList = ['https://www.google.com.ar', 'http://localhost:8080', 'https://www.clarin.com', 'http://localhost:3030'];

const validateCors = (req: express.Request, callback: Function) => {
    const origin = req.header('Origin');

    if (whiteList.indexOf(origin!) < 0) return callback(null, { origin: false });

    if (origin === whiteList[0] && req.method === 'GET') return callback(null, { origin: false });

    return callback(null, { origin: true });
}

app.use(cors(validateCors));

//passport
passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

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