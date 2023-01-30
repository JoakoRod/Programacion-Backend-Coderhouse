"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("../routes/index"));
const http_errors_1 = __importDefault(require("http-errors"));
const socket_1 = require("./socket");
const path_1 = __importDefault(require("path"));
const handlebars = __importStar(require("express-handlebars"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const index_2 = __importDefault(require("../config/index"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("./auth");
//import morgan from 'morgan';
const compression_1 = __importDefault(require("compression"));
const logger_1 = require("./logger");
//avatars and files
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: './public/avatars/' });
const ttlSeconds = 600;
const StoreOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl: index_2.default.MONGO_ATLAS_URL,
        /* crypto: {
            secret: config.secret2,
        }, */
    }),
    secret: index_2.default.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000,
    },
};
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
const viewsFolderPath = path_1.default.resolve(__dirname, '../../views');
const layoutDirPath = path_1.default.resolve(__dirname, '../../views/layouts');
const defaultLayerPath = path_1.default.resolve(__dirname, '../../views/layouts/index.hbs');
const partialDirPath = path_1.default.resolve(__dirname, '../../views/partials');
app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);
app.engine('hbs', handlebars.engine({
    extname: ".hbs",
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPath,
    partialsDir: partialDirPath
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)(StoreOptions));
app.use(express_1.default.static('public'));
//app.use(morgan('dev'));
app.use((0, compression_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use('login', auth_1.loginFunc);
passport_1.default.use('signup', auth_1.signUpFunc);
app.use('/', index_1.default);
app.use((req, res, next) => {
    const ruta = req.path;
    const metodo = req.method;
    logger_1.logger.warn(`Se intento acceder a ${ruta} con el metodo ${metodo}`);
    next((0, http_errors_1.default)(501, `ruta '${ruta}' método '${metodo}' no implementada`));
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'internal server err';
    logger_1.logger.error(`ERROR ${status} \n ${message}`);
    res.status(status).json({
        message,
        stack: err.stack
    });
});
(0, socket_1.initWsServer)(server);
exports.default = server;
//# sourceMappingURL=server.js.map