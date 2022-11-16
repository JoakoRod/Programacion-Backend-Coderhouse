import knex from 'knex';
import { dbConfig } from '../../options/dbMysql';

class DB {
  constructor(options) {
    this.connection = knex(options);
  }

  init() {
    this.connection.schema.hasTable('mensajes').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla mensajes!');

      return this.connection.schema.createTable('mensajes', async (mensajesTable) => {
        mensajesTable.increments('id').primary();
        mensajesTable.string('usuario').notNullable();
        mensajesTable.string('msg').notNullable();
        mensajesTable.string('fecha').notNullable();
      });
    });

    this.connection.schema.hasTable('productos').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connection.schema.createTable('productos', async (productosTable) => {
        productosTable.increments('id').primary();
        productosTable.string('title').notNullable();
        productosTable.float('price').notNullable();
        productosTable.string('thumbnail').notNullable();
      });
    });
  }

  /* get(tableName, id) {
    if (id) return this.connection(tableName).where('id', id);

    return this.connection(tableName);
  }

  create(tableName, data) {
    return this.connection(tableName).insert(data);
  }

  update(tableName, id, data) {
    return this.connection(tableName).where('id', id).update(data);
  }

  delete(tableName, id) {
    return this.connection(tableName).where('id', id).del();
  } */
}

export const DBService = new DB(dbConfig);
