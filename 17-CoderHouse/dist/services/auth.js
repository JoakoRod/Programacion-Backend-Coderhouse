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
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};
/**
 * Recibimos el objeto request, el username y el password
 * Buscando que haya un match en nuestra DB
 * Si sale todo bien llamamos a done pasando null como primer argumento y como segundo argumento la info del usuario que encontramos en la DB
 * Si no hay match pasamos como segundo argumento false (eso indica que no encontramos un usuario con esa data).
 * Opcionalmente podemos mandar como tercer argumento un mensaje de error
 */
const login = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuarios_1.UserModel.findOne({ username, password });
    if (!user) {
        return done(null, false, { message: 'Invalid Username/Password' });
    }
    return done(null, user);
});
/**
 * Recibimos el objeto request, el username y el password
 * Recibimos del body la info del nuevo usuario
 * Verificamos que el username o email no este tomado, caso contrario devolvemos false en done indicando que hubo un error
 * Creamos el usuario nuevo y devolvemos el usuario creado a done
 */
const signup = (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        // Nota: Username y password no se verifica porque ya lo hace passport.
        if (!email) {
            return done(null, false, { message: 'Invalid Body Fields' });
        }
        const query = {
            $or: [{ username: username }, { email: email }],
        };
        const user = yield usuarios_1.UserModel.findOne(query);
        if (user) {
            console.log('User already exists');
            return done(null, false, { message: 'User already exists' });
        }
        else {
            const userData = {
                username,
                password,
                email,
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