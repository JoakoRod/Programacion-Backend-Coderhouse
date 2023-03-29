import passport from 'passport';
import { Request } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { usersDao } from '../controllers/users';
import Logger from './logger';
import bcrypt from 'bcrypt';



interface IStrategyOptionsWithRequest {
    usernameField?: string | undefined;
    passwordField?: string | undefined;
    session?: boolean | undefined;
    passReqToCallback: true;
}

const strategyOptions: IStrategyOptionsWithRequest = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const login = async (req: Request, email: string, password: string, done: Function) => {
    const user = await usersDao.queryUser({ email: email });
    if (user.length > 0) {
        const compare = await bcrypt.compare(password, user[0].password);
        if (compare == false) {
            return done(null, false, { message: 'Invalid Password' });
        }
        return done(null, user);
    }
    return done(null, false, { message: 'Invalid username' });
};

const signup = async (req: Request, username: string, password: string, done: Function) => {
    try {
        const { email, password, firstName, lastName, address, age, phone } = req.body;

        // Nota: Username y password no se verifica porque ya lo hace passport.
        if (!email || !firstName || !lastName || !address || !age || !phone) {
            return done(null, false, { message: 'Invalid Body Fields' });
        }

        const user = await usersDao.validateUser(email, phone);

        if (user.length > 0) {
            Logger.info('User already exists');
            return done(null, false, { message: 'User already exists' });
        } else {
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

            const newUser = await usersDao.addUser(userData);

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
    done(null, user[0].id);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para crear el objeto req.user 
 */
passport.deserializeUser((userId: string, done) => {
    //Notar que recibimos el userId en la funcion (que es lo que mandamos en el done del serializedUser)
    //Buscamos el usuario con ese id y lo retornamos. El resultado va a estar en req.user
    usersDao.getUser(userId).then((user) => {
        return done(null, user);
    })
});