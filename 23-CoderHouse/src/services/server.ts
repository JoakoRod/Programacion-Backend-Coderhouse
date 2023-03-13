import koa from 'koa';
import koaBody from 'koa-body';
import handlebars from 'koa-hbs';
import koaStatic from 'koa-static';
import session from 'koa-session';
import passport from 'koa-passport';
import cors from '@koa/cors';
import http from 'http';
import { initWsServer } from './socket';
import path from 'path';
import MongoStore from 'connect-mongo';
import { signUpFunc, loginFunc } from './auth';
import mainRouter from '../routes/index';
//import morgan from 'morgan';
import { Logger } from './logger';
//avatars and files
import multer from 'multer';
import { puerto } from '../index'

const upload = multer({ dest: './public/avatars/' });

const ttlSeconds = 600;

const app = new koa();
const server = new http.Server(app.callback());

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../../views/partials');

app.use(handlebars.middleware({
    viewPath: viewsFolderPath,
    layoutsPath: layoutDirPath,
    defaultLayout: defaultLayerPath,
    partialsPath: partialDirPath,
}));

app.use(koaBody());
app.use(session({}, app))
app.use(session({
    maxAge: ttlSeconds * 1000,
    /* store: MongoStore.create({
        mongoUrl: config.MONGO_ATLAS_URL,

    }) */
}, app));
app.use(cors({ origin: `http://localhost:${puerto}` }));
/* app.use(session(StoreOptions)); */
app.use(koaStatic('public'));
//app.use(morgan('dev'));
/* app.use(compression()); */

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use(mainRouter);

app.use((ctx: koa.Context, next: koa.Next) => {
    const ruta = ctx.path;
    const metodo = ctx.method;
    Logger.warn(`Se intento acceder a ${ruta} con el metodo ${metodo}`);
    ctx.status = 501;
    ctx.response.body = {
        msg: `ruta '${ruta}' método '${metodo}' no implementada`,
    };
})

app.use(async (ctx: koa.Context, next: koa.Next) => {
    Logger.info(`Request ${ctx.method} ${ctx.url}`);
    try {
        await next();
    } catch (err) {
        const miError: any = err;
        console.log(`HUBO UN ERROR ${miError.message}`);
        ctx.status = 500;
        ctx.body = { error: miError.message };
        ctx.app.emit('error', err, ctx);
    }
});

initWsServer(server);

export default server;