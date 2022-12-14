import express from 'express';
import http from 'http';
import mainRouter from '../routes/index';
import createError from 'http-errors';
import { initWsServer } from './socket';
import path from 'path';
import * as handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config/index';

/* const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: config.MONGO_ATLAS_URL,
      crypto: {
        secret: 'squirrel',
      },
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: ttlSeconds * 1000,
    },
  }; */

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
    defaultLayout: defaultLayerPath,
    layoutsDir: layoutDirPath,
    partialsDir: partialDirPath
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', mainRouter);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ruta = req.path;
    const metodo = req.method;
    next(createError(501, `ruta '${ruta}' método '${metodo}' no implementada`));
})

initWsServer(server);

app.use((err: { status: number; message: string; stack: string; }, req: express.Request, res: express.Response) => {
    const status = err.status || 500;
    const message = err.message || 'internal server err';

    res.status(status).json({
        message,
        stack: err.stack
    })
});

export default server;