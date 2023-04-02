import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import http from 'http';
import mainRouter from '../routes';
import Logger from './logger';
import { signUpFunc, loginFunc } from './auth';
import * as handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import { initWsServer } from './socket';
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
        maxAge: config.cookieMaxAge * 1000,
    },
};

//crear el servidor
const app = express();
const server = new http.Server(app); //Necesario para poder usar io

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPath,
    partialsDir: partialDirPath,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session
app.use(session(StoreOptions));

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

//cors
const whiteList = ['https://www.google.com.ar', 'http://localhost:8080', 'https://www.clarin.com', 'http://localhost:3030'];


const validateCors = (req: express.Request, callback: Function) => {
    const origin = req.header('Origin');

    if (whiteList.indexOf(origin!) < 0) return callback(null, { origin: false });

    if (origin === whiteList[0] && req.method === 'GET') return callback(null, { origin: false });

    return callback(null, { origin: true });
}

app.use(cors(validateCors));

//public
app.use(express.static('public'));

//rutas
app.use(mainRouter);

//rutas no existentes
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ruta = req.path;
    const metodo = req.method;
    Logger.warn(`Se intento acceder a ${ruta} con el metodo ${metodo}`);
    res.status(501).send(`La ruta ${ruta} con el metodo ${metodo} no existe`)
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

initWsServer(server);

export default server;