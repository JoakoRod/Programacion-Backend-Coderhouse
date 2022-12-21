import { Imensajes, mensajesModel } from '../models/mensajes';
import { denormalize, normalize, schema } from 'normalizr';
import fs from 'fs';
import path from 'path'
//import * as util from 'util';

const jsonMensajes = path.join(__dirname, '../data/mensajesNormalizados.json');

export async function getAll() {
    const mensajes = normalizar(await mensajesModel.find().lean());

    //console.log(util.inspect(mensajes, true, 3, true));
    return mensajes;

}

export async function getAllNormal() {
    return await mensajesModel.find().lean();
}

export async function save(msg: any) {
    await mensajesModel.create(msg)
}

export function normalizar(data: Imensajes) {

    const user = new schema.Entity('authors', {}, { idAttribute: 'id' });
    const msg = new schema.Entity('messages', { author: user });

    const msgSchema = new schema.Array({
        author: user,
        text: [msg]
    })

    const dataNormalizada = normalize(data, msgSchema);

    return dataNormalizada
}

export async function escribirNormalizado() {
    const mensajesNormalizados = await getAll()
    fs.writeFileSync(jsonMensajes, JSON.stringify(mensajesNormalizados, null, 2))
}

export async function leerDenormalizadoDesdeArchivo() {
    const author = new schema.Entity('authors', {});
    const text = new schema.Entity('text', { author: author });
    const finalSchema = new schema.Array(text)


    const data = JSON.parse(fs.readFileSync(jsonMensajes).toString());
    const dataDenormalizada = denormalize(data.result, finalSchema, data.entities);
    
    return dataDenormalizada;
}