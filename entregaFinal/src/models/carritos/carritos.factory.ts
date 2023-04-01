import Logger from '../../services/logger'
/* import CarritosMemDAO from './memoria';
import CarritosFSDAO from './fs'; */
import CarritosMongoDAO from './DAOs/mongo';

export default class CarritosFactoryDAO {
    static get(tipo: string) {
        switch (tipo) {
            /* case 'MEM':
                Logger.info('Retornando instancia Memoria de Carritos');
                return new CarritosMemDAO();
            case 'FS':
                Logger.info('Retornando instancia FS de Carritos');
                return new CarritosFSDAO(); */
            case 'MONGO':
                Logger.info('Retornando instancia Mongo de Carritos');
                return new CarritosMongoDAO();
            default:
                Logger.info('Retornando instancia Por defecto (Mongo) de Carritos');
                return new CarritosMongoDAO();
        }
    }
}