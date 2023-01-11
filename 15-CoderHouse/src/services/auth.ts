import passport from 'passport';
import { Request } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/usuarios';

interface IStrategyOptionsWithRequest {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback: true;
}

const strategyOptions: IStrategyOptionsWithRequest = {
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

const login = async (req: Request, username: string, password: string, done: Function) => {
    const user: any = await UserModel.findOne({ username, password });

    if (!user) {
        return done(null, false, { message: 'Invalid Username/Password' });
    }
    return done(null, user);
};

/**
 * Recibimos el objeto request, el username y el password
 * Recibimos del body la info del nuevo usuario
 * Verificamos que el username o email no este tomado, caso contrario devolvemos false en done indicando que hubo un error
 * Creamos el usuario nuevo y devolvemos el usuario creado a done
 */
const signup = async (req: Request, username: string, password: string, done: Function) => {
    try {
        const { username, password, email } = req.body;
    
        // Nota: Username y password no se verifica porque ya lo hace passport.
        if (!email) {
            return done(null, false, { message: 'Invalid Body Fields' });
        }

        const query = {
            $or: [{ username: username }, { email: email }],
        };

        const user = await UserModel.findOne(query);

        if (user) {
            console.log('User already exists');
            return done(null, false, { message: 'User already exists' });
        } else {
            const userData = {
                username,
                password,
                email,
                role: 'user'
            };

            const newUser = await UserModel.create(userData);

            return done(null, newUser);
        }
    } catch (error) {
        done(error);
    }
};


export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);

/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport 
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */
passport.serializeUser((user: any, done) => {
    //Notar que vamos a guardar en req.session.passport el id del usuario. nada mas
    done(null, user._id);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para crear el objeto req.user 
 */
passport.deserializeUser((userId: string | number, done) => {
    //Notar que recibimos el userId en la funcion (que es lo que mandamos en el done del serializedUser)
    //Buscamos el usuario con ese id y lo retornamos. El resultado va a estar en req.user
    UserModel.findById(userId).then((user) => {
        return done(null, user);
    })
});