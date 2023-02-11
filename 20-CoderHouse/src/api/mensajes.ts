import { Imensajes, mensajesModel } from '../database/daos/mongo/schemas/mensajes';
import { denormalize, normalize, schema } from 'normalizr';
import createError from 'http-errors';
import fs from 'fs';
import path from 'path'
//import * as util from 'util';

const jsonMensajes = path.join(__dirname, '../data/mensajesNormalizados.json');

const getAll = async () => {
    try {
        const mensajes = normalizar(await mensajesModel.find().lean());

        //console.log(util.inspect(mensajes, true, 3, true));
        return mensajes;
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
}

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
}

const save = async (msg: any) => {
    try {
        await mensajesModel.create(msg)
    } catch (error) {
        throw createError(500, `error con la db ${error}`);
    }
}

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
}

export default {
    getAll,
    getAllNormal, 
    getAllPopulate,
    save,
    normalizar,
    escribirNormalizado,
    leerDenormalizadoDesdeArchivo
}