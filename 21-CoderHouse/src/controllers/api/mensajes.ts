import { mensajesAPI } from '../../api';
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors';

let messagesDao: mensajesAPI;

mensajesAPI.getInstance().then((instance) => {
    messagesDao = instance;
});

const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.query.id)
        res.json(await messagesDao.getMessage(id));
    } catch (error) {
        createError(500, `Error en la db ${error}`);
        next();
    }
};

const addMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const msg = req.body;
        await messagesDao.addMessage(msg);
        res.json({ msg: 'ok' });
    } catch (error) {
        createError(500, `Error en la db ${error}`);
        next();
    }
};

export default {
    getMessage,
    addMessage
};