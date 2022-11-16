import knex from 'knex';
import dbConfig from '../../options/dbMysql';

class DB {
  constructor() {
    const useProducts = 'products';
    const useMessages = 'messages';
    const optionsProducts = dbConfig[useProducts];
    const optionsMessages = dbConfig[useMessages];
    this.connectionProducts = knex(optionsProducts);
    this.connectionMessages = knex(optionsMessages);
  }

  init() {
    this.connectionMessages.schema.hasTable('mensajes').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla mensajes!');

      return this.connectionMessages.schema.createTable('mensajes', async (mensajesTable) => {
        mensajesTable.increments('id').primary();
        mensajesTable.string('usuario').notNullable();
        mensajesTable.string('msg').notNullable();
        mensajesTable.string('fecha').notNullable();
      });
    });

    this.connectionProducts.schema.hasTable('productos').then((exists) => {
      if (exists) return;
      console.log('Creamos la tabla productos!');

      return this.connectionProducts.schema.createTable('productos', async (productosTable) => {
        productosTable.increments('id').primary();
        productosTable.string('title').notNullable();
        productosTable.float('price').notNullable();
        productosTable.string('thumbnail', 10000).notNullable();
      });
    });
  }

  get(tableName, id) {
    if (tableName == 'mensajes') {
      if (id) return this.connectionMessages(tableName).where('id', id);
      return this.connectionMessages.from(tableName).select('*');
    } else if (tableName == 'productos') {
      if (id) return this.connectionProducts(tableName).where('id', id);
      return this.connectionProducts.from(tableName).select('*');
    }

  }

  create(tableName, data) {
    if (tableName == 'mensajes') {
      return this.connectionMessages(tableName).insert(data);
    } else if (tableName == 'productos') {
      return this.connectionProducts(tableName).insert(data);
    }
  }

  update(tableName, id, data) {
    if (tableName == 'mensajes') {
      return this.connectionMessages(tableName).where('id', id).update(data);
    } else if (tableName == 'productos') {
      return this.connectionProducts(tableName).where('id', id).update(data);
    }
  }

  delete(tableName, id) {
    if (tableName == 'mensajes') {
      return this.connectionMessages(tableName).where('id', id).del();
    } else if (tableName == 'productos') {
      return this.connectionProducts(tableName).where('id', id).del();
    }
  }
}

export const DBService = new DB();