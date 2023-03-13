import { productosAPI } from '../../api';
import { Context, Next } from 'koa';

const login = async (ctx: Context | any, next: Next) => {
    ctx.json({ msg: 'Bienvenido!!' });
};

const signUp = async (ctx: Context | any, next: Next) => {
    ctx.json({ msg: 'Bienvenido!!' });
};

const info = async (ctx: Context | any, next: Next) => {
    ctx.send({
        session: ctx.session,
        sessionId: ctx.sessionID,
        cookies: ctx.cookies,
    });
};

const logout = async (ctx: Context | any, next: Next) => {
    ctx.session.destroy((err: any) => {
        if (!err) ctx.send('Logout ok!');
        else ctx.throw(500, 'Logout ERROR')
    });
};



export default {
    login,
    signUp,
    info,
    logout
}