import mongoose from 'mongoose';
import knex from 'knex';
import config from '../config/index';

export async function initMongoDB() {
    try {
        console.log('conectando a la db');
        await mongoose.connect(config.MONGO_ATLAS_URL);

        console.log('conexion funcionando!');
    } catch (error) {
        console.log(`Error => ${error}`);
        return error;
    }
}


export const connectionProducts = knex(config.SQL_CONNECTION);

export function initKnex() {
    connectionProducts.schema.hasTable('productos').then((exists) => {
        if (exists) return;
        console.log('Creamos la tabla productos!');

        return connectionProducts.schema.createTable('productos', async (productosTable) => {
            productosTable.increments('id').primary();
            productosTable.string('nombre').notNullable();
            productosTable.text('descripcion');
            productosTable.float('codigo').notNullable();
            productosTable.text('foto');
            productosTable.float('precio').notNullable();
            productosTable.bigInteger('stock').notNullable();
        });
    });
};

