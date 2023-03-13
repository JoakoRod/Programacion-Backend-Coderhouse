import { mensajesAPI } from '../../api';
import { Context, Next } from 'koa';


let messagesDao: mensajesAPI;

mensajesAPI.getInstance().then((instance) => {
    messagesDao = instance;
});

const getMessage = async (ctx: Context | any, next: Next) => {
    const id = ctx.request.query.id;
    ctx.response.body = await messagesDao.getMessage(id);

};

const addMessage = async (ctx: Context | any, next: Next) => {
    const msg = ctx.request.body;
    await messagesDao.addMessage(msg);
    ctx.response.body = { msg: 'ok' };
};

export default {
    getMessage,
    addMessage
};