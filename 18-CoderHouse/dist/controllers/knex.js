"use strict";
/*import { connectionProducts } from '../services/database';
import { IProductos } from '../../models/productos'

//function comprobarProducto(producto: IProductos) {
//    if (typeof product.price == 'string') product.price = parseFloat(product.price);
//    if (!product.title || !product.price || !product.thumbnail || typeof product.title !== 'string' ||
//        typeof product.price !== 'number' || typeof product.thumbnail !== 'string') throw createError(400, 'Datos invalidos');
//}

export function getKnex(tableName: string, id?: String | Number) {
    if (tableName == 'productos') {
        if (id) return connectionProducts(tableName).where('id', id);
        return connectionProducts.from(tableName).select('*');
    }
};

export function createKnex(tableName: string, data: Object | String) {
    if (tableName == 'productos') {
        return connectionProducts(tableName).insert(data);
    }
};

export function updateKnex(tableName: string, data: Object | String, id?: String | Number) {
    if (tableName == 'productos') {
        return connectionProducts(tableName).where('id', id).update(data);
    }
};

export function deleteKnex(tableName: string, id?: String | Number) {
    if (tableName == 'productos') {
        return connectionProducts(tableName).where('id', id).del();
    }
};*/ 
//# sourceMappingURL=knex.js.map