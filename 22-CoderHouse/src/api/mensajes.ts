import { ValidationResult } from 'joi';
import Config from '../config';
import { Logger } from '../services/logger';
import { MessagesFactoryDAO, MessagesDAO } from '../models/messages/messages.factory';
import { MessageI, MessagesDTO } from '../models/messages/messages.interfaces';
import { MessageJoiSchema } from '../models/messages/messages.schemas';
/* import * as util from 'util';
import fs from 'fs';
import path from 'path'
const jsonMensajes = path.join(__dirname, '../data/mensajesNormalizados.json'); */

export default class MessagesAPI {
    private static instance: MessagesAPI;
    private messages: MessagesDAO;

    private constructor(dao: MessagesDAO) {
        this.messages = dao;
    }

    static async getInstance(): Promise<MessagesAPI> {
        if (!this.instance) {
            const dao = await MessagesFactoryDAO.get(Config.PERSISTENCIA);
            MessagesAPI.instance = new MessagesAPI(dao);
        }

        return MessagesAPI.instance;
    }

    validateSchema(data: any) {
        const result: ValidationResult = MessageJoiSchema.validate(data);

        if (result.error) {
            return {
                valid: false,
                errors: result.error.details,
            };
        }

        return {
            valid: true,
        };
    }

    getMessage(id?: string): Promise<MessagesDTO[] | MessagesDTO> {
        return this.messages.get(id);
    }

    getMessagePopulate(populate: string, id?: string): Promise<MessagesDTO[] | MessagesDTO> {
        return this.messages.getPopulate(populate, id);
    }

    addMessage(data: MessageI): Promise<MessagesDTO> {
        return this.messages.add(data);
    }

    updateMessage(id: string, newMessageData: MessageI): Promise<MessagesDTO> {
        return this.messages.update(id, newMessageData);
    }

    deleteMessage(id: string): Promise<void> {
        return this.messages.delete(id);
    }
}

/* 
const getAllNormal = async () => {
    try {
        return await mensajesModel.find().lean();
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
}

const getAllPopulate = async () => {
    try {
        return await mensajesModel.find().populate('user').lean();
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
} */

/* 
const normalizar = (data: Imensajes) => {
    try {
        const user = new schema.Entity('authors', {}, { idAttribute: 'id' });
        const msg = new schema.Entity('messages', { author: user });

        const msgSchema = new schema.Array({
            author: user,
            text: [msg]
        })

        const dataNormalizada = normalize(data, msgSchema);

        return dataNormalizada
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
}

const escribirNormalizado = async () => {
    try {
        const mensajesNormalizados = await getAll()
        fs.writeFileSync(jsonMensajes, JSON.stringify(mensajesNormalizados, null, 2))
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
}

const leerDenormalizadoDesdeArchivo = () => {
    try {
        const author = new schema.Entity('authors', {});
        const text = new schema.Entity('text', { author: author });
        const finalSchema = new schema.Array(text)


        const data = JSON.parse(fs.readFileSync(jsonMensajes).toString());
        const dataDenormalizada = denormalize(data.result, finalSchema, data.entities);

        return dataDenormalizada;
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
} */

/* export default {
    getAll,
    getAllNormal, 
    getAllPopulate,
    save,
    normalizar,
    escribirNormalizado,
    leerDenormalizadoDesdeArchivo
} */