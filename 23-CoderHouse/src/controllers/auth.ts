import { Context, Next } from 'koa';
import passport from 'passport';
import { mandarMail } from '../services/email';
import config from '../config';
import multer from 'multer';

//multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/avatars');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.email);
    }
});

const upload = multer({ storage: storage });

const renderLogin = async (ctx: Context | any, next: Next) => {
    await ctx.render('login', { layout: 'layoutLogin' });
}

const authenticate = async (ctx: Context | any, next: Next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            ctx.throw(500, 'error en la autenticacion');
        }
        if (!user) {
            ctx.response.status = 401
            return ctx.render('error', { layout: 'error', error: 'Error en el login' });
        } else {
            ctx.logIn(user, function () {
                return ctx.redirect('/');
            });
        }

    })(ctx, next);
}

const signUp = async (ctx: Context | any, next: Next) => {
    passport.authenticate('signup', (err, user, info) => {
        if (err) {
            ctx.throw(500, 'error en la autenticacion');
        }
        if (!user) {
            ctx.status = 401;
            return ctx.render('error', { layout: 'error', error: 'Error en la creacion de usuario' });
        } else {
            upload.single('avatar')
            mandarMail(config.user, 'nuevo registro', String(JSON.stringify(ctx.request.body, null, 2)));
            return ctx.redirect('/');
        }

    })(ctx, next);
}

const logout = (ctx: Context | any, next: Next) => {
    ctx.request.session.destroy((err: any) => {
        if (!err) ctx.redirect('/');
        ctx.throw(500, 'Logout ERROR')
    });
}

export default {
    renderLogin,
    authenticate,
    signUp,
    logout
}