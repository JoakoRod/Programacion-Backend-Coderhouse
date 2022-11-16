import fs from 'fs';
import createError from 'http-errors';
import { DBService } from '../services/db';

const tableName = 'mensajes';

class Mensajes {

    async getAll() {
        return await DBService.get(tableName);
    }

    async save(msj) {
        await DBService.create(tableName, msj);
    }
}

const instanciaMensajes = new Mensajes();

module.exports = {
    MensajesController: instanciaMensajes
}