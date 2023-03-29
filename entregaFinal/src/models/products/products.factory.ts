import Logger from '../../services/logger'
/* import ProductosMemDAO from './memoria';
import ProductosFSDAO from './fs'; */
import ProductosMongoDAO from './DAOs/mongo';

export default class ProductsFactoryDAO {
    static get(tipo: string) {
        switch (tipo) {
            /* case 'MEM':
                Logger.info('Retornando instancia Memoria de Productos');
                return new ProductosMemDAO();
            case 'FS':
                Logger.info('Retornando instancia FS de Productos');
                return new ProductosFSDAO(); */
            case 'MONGO':
                Logger.info('Retornando instancia Mongo de Productos');
                return new ProductosMongoDAO();
            default:
                Logger.info('Retornando instancia Por defecto (Mongo) de Productos');
                return new ProductosMongoDAO();
        }
    }
}