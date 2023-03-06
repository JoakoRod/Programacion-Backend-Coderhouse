import bodyParser from "body-parser";
import { ErrorRequestHandler } from 'express';
import express from 'express';
import http from 'http';
import mainRouter from '../routes/index';
import createError from 'http-errors';
import { initWsServer } from './socket';
import path from 'path';
import * as handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config/index';
import passport from 'passport';
import { signUpFunc, loginFunc } from './auth';
//import morgan from 'morgan';
import compression from 'compression';
import { Logger } from './logger';
//avatars and files
import multer from 'multer';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from './graphql';
import { puerto } from '../index'

const upload = multer({ dest: './public/avatars/' });

const ttlSeconds = 600;

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
        maxAge: ttlSeconds * 1000,
    },
};

const app = express();
const server = new http.Server(app);

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(session(StoreOptions));
app.use(cors({ origin: `http://localhost:${puerto}` }));
app.use(express.static('public'));
//app.use(morgan('dev'));
app.use(compression());

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    Logger.info(`Request ${req.method} ${req.url}`);
    next();
})

app.use('/', mainRouter);
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,
}));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {

    const ruta = req.path;
    const metodo = req.method;
    Logger.warn(`Se intento acceder a ${ruta} con el metodo ${metodo}`);
    res.status(501).json({
        msg: `ruta '${ruta}' método '${metodo}' no implementada`,
    });
})

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