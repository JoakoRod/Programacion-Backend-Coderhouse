import mongoose from 'mongoose';
import knex from 'knex';
import dbConfig from '../../options/configDB';

//const connectionString = 'mongodb+srv://admin:admin@coderhouse.dahey8p.mongodb.net/Entrega11?retryWrites=true&w=majority';
const connectionString = 'mongodb://127.0.0.1:27017/Entrega11';

export async function initMongoDB() {
    try {
        console.log('conectando a la db');
        await mongoose.connect(connectionString);

        console.log('conexion funcionando!');
    } catch (error) {
        console.log(`Error => ${error}`);
        return error;
    }
}


const useProducts = 'products';
const optionsProducts = dbConfig[useProducts];
export const connectionProducts = knex(optionsProducts);



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

