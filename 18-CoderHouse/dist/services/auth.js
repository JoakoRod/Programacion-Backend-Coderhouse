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
exports.signUpFunc = exports.loginFunc = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const usuarios_1 = require("../models/usuarios");
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};
const login = (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuarios_1.UserModel.findOne({ email });
    //si no encuentra el username o si su contrasena (encriptada) no es encontrada
    if (!user || (yield user.isValidPassword(password)) == false) {
        return done(null, false, { message: 'Invalid Username/Password' });
    }
    return done(null, user);
});
const signup = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName, address, age, phone } = req.body;
        // Nota: Username y password no se verifica porque ya lo hace passport.
        if (!email || !firstName || !lastName || !address || !age || !phone) {
            return done(null, false, { message: 'Invalid Body Fields' });
        }
        const query = {
            $or: [{ email: email }, { phone: phone }],
        };
        const user = yield usuarios_1.UserModel.findOne(query);
        if (user) {
            //logger.info('User already exists');
            return done(null, false, { message: 'User already exists' });
        }
        else {
            const userData = {
                email,
                password,
                firstName,
                lastName,
                address,
                age,
                phone,
                role: 'user'
            };
            const newUser = yield usuarios_1.UserModel.create(userData);
            return done(null, newUser);
        }
    }
    catch (error) {
        done(error);
    }
});
exports.loginFunc = new passport_local_1.Strategy(strategyOptions, login);
exports.signUpFunc = new passport_local_1.Strategy(strategyOptions, signup);
/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */
passport_1.default.serializeUser((user, done) => {
    //Notar que vamos a guardar en req.session.passport el id del usuario. nada mas
    done(null, user._id);
});
/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para crear el objeto req.user
 */
passport_1.default.deserializeUser((userId, done) => {
    //Notar que recibimos el userId en la funcion (que es lo que mandamos en el done del serializedUser)
    //Buscamos el usuario con ese id y lo retornamos. El resultado va a estar en req.user
    usuarios_1.UserModel.findById(userId).then((user) => {
        return done(null, user);
    });
});
//# sourceMappingURL=auth.js.map