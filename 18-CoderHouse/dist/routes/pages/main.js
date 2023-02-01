"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mensajes_1 = require("../../controllers/mensajes");
const http_errors_1 = __importDefault(require("http-errors"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../../middlewares/auth");
const productos_1 = require("../../controllers/productos");
const email_1 = require("../../services//email");
const multer_1 = __importDefault(require("multer"));
const index_1 = __importDefault(require("../../config/index"));
const twilio_1 = require("../../services/twilio");
const moment_1 = __importDefault(require("moment"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/avatars');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.email);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
//const tableName = 'productos';
//const passportOptions = { failureRedirect: '/login' };
//Login, logout y signup
router.get('/login', (req, res, next) => {
    res.render('login', { layout: 'layoutLogin' });
});
router.post('/login', passport_1.default.authenticate('login', { failureRedirect: '/errorLogin' }), (req, res, next) => {
    res.redirect('/');
});
router.post('/signUp', upload.single('avatar'), passport_1.default.authenticate('signup', { failureRedirect: '/errorSignUp' }), (req, res, next) => {
    (0, email_1.mandarMail)(index_1.default.user, 'nuevo registro', String(JSON.stringify(req.body, null, 2)));
    res.redirect('/');
});
router.get('/logout', (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (!err)
                res.redirect('/');
            else
                throw (0, http_errors_1.default)(500, 'Logout ERROR');
        });
    }
    catch (error) {
        next(error);
    }
});
//errores
router.get('/errorLogin', (req, res, next) => {
    try {
        res.render('error', { layout: 'error', error: 'Error en el login' });
    }
    catch (error) {
        next(error);
    }
});
router.get('/errorSignUp', (req, res, next) => {
    try {
        res.render('error', { layout: 'error', error: 'Error en la creacion de usuario' });
    }
    catch (error) {
        next(error);
    }
});
//main
router.get('/', auth_1.isLoggedInPage, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const mensajes = yield (0, mensajes_1.getAllPopulate)();
    mensajes.forEach((mensaje) => {
        mensaje.createdAt = (0, moment_1.default)(mensaje.createdAt).format("DD/MM/YYYY HH:mm:ss");
    });
    console.log(mensajes);
    try {
        const datos = {
            productos: yield (0, productos_1.getAllProducts)(),
            mostrar: true,
            ruta: '/',
            mensajes: mensajes,
            user: `${req.user.firstName} ${req.user.lastName}`,
            admin: req.user.role == 'admin'
        };
        if (!Array.isArray(datos.productos) || datos.productos.length === 0)
            datos.mostrar = false;
        res.render('carga_vista', datos);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = req.body;
        yield (0, productos_1.saveProduct)(producto);
        res.redirect('/');
    }
    catch (error) {
        next(error);
    }
}));
router.get('/carrito', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //render pagina de carrito
}));
router.post('/carrito', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //realizar proceso de compra (encontrar los productos, restar stock y demas)
    (0, email_1.mandarMail)(index_1.default.user, `nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`, String(JSON.stringify(req.body, null, 2)));
    (0, twilio_1.mandarWsp)(`nuevo pedido de ${req.user.email} - ${req.user.firstName} ${req.user.lastName}`);
    (0, twilio_1.mandarMsg)('Su pedido ha sido reccibido y sera enviado a la brevedad', req.user.phone);
    res.send({ msg: "ok" });
}));
exports.default = router;
//# sourceMappingURL=main.js.map