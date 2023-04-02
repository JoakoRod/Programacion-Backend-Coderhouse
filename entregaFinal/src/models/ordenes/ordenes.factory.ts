import Logger from '../../services/logger'
/* import OrdenesMemDAO from './memoria';
import OrdenesFSDAO from './fs'; */
import OrdenesMongoDAO from './DAOs/mongo';

export default class OrdenesFactoryDAO {
    static get(tipo: string) {
        switch (tipo) {
            /* case 'MEM':
                Logger.info('Retornando instancia Memoria de Ordenes');
                return new OrdenesMemDAO();
            case 'FS':
                Logger.info('Retornando instancia FS de Ordenes');
                return new OrdenesFSDAO(); */
            case 'MONGO':
                Logger.info('Retornando instancia Mongo de Ordenes');
                return new OrdenesMongoDAO();
            default:
                Logger.info('Retornando instancia Por defecto (Mongo) de Ordenes');
                return new OrdenesMongoDAO();
        }
    }
}