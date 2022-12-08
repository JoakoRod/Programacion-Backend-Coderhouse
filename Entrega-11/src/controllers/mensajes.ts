import { Imensajes, mensajesModel } from '../../models/mensajes';
import { denormalize, normalize, schema } from 'normalizr';
import * as util from 'util';

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity('message', { author: author, }, { idAttribute: '_id' });

const finalSchema = new schema.Array(msge);

export async function getAll() {
    const mensajes = normalize(await mensajesModel.find().lean(), finalSchema);
    //console.log(util.inspect(mensajes, true, 3, true));
    return mensajes;

}

export async function getAllNormal() {
    return await mensajesModel.find().lean();
}

export async function save(msg: any) {
    await mensajesModel.create(msg)
}

export function desnormalizar(mensaje: any) {
    return denormalize(mensaje.result, finalSchema, mensaje.entities);
}

export function normalizar(mensaje: any) { 
    return normalize(mensaje, finalSchema);
}