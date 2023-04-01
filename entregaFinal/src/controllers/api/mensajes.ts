import { mensajesAPI, usuariosAPI } from '../apis';
import { Request, Response, NextFunction } from 'express'

const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.id) {
            const id = String(req.query.id)
            res.json(await mensajesAPI.getMessage(id));
        } else {
            res.json(await mensajesAPI.getMessage());
        }
    } catch (error) {
        next(error);
    }
};

const getMessageByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.query.id) {
            const msg = await mensajesAPI.getMessagePopulate('user', String(req.query.id))
            res.json(msg);
        } else {
            const msgs = await mensajesAPI.getMessagePopulate('user')
            res.json(msgs);
        }
    } catch (error) {
        next(error);
    }
};

const getMessagesUsuario = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const idUser = req.user.id;
        const msg = await mensajesAPI.getMessageUser(idUser)
        res.json(msg);
    } catch (error) {
        next(error);
    }
};

const addMessage = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        await mensajesAPI.addMessage({ user: String(req.user.id), text: req.body.text});
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
};

const putMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await mensajesAPI.updateMessage(String(req.params.id), req.body);
        res.json({ msg: 'ok' });

    } catch (error) {
        next(error);
    }
};

const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await mensajesAPI.deleteMessage(id);
        res.json({ msg: 'ok' });
    } catch (error) {
        next(error);
    }
};

const getMessageByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const user = await usuariosAPI.queryUser({email: email});
        const msg = await mensajesAPI.queryMessage({user: user[0].id})
        res.json(msg);
    } catch (error) {
        next(error);
    }
};

export default {
    getMessage,
    addMessage,
    getMessageByUser,
    putMessage,
    deleteMessage,
    getMessagesUsuario,
    getMessageByEmail
};