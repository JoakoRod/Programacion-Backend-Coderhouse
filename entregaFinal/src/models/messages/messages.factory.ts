import Logger from '../../services/logger'
/* import MessagesMemDAO from './memoria';
import MessagesFSDAO from './fs'; */
import MessagesMongoDAO from './DAOs/mongo';

export default class MessagesFactoryDAO {
    static get(tipo: string) {
        switch (tipo) {
            /* case 'MEM':
                Logger.info('Retornando instancia Memoria de Messages');
                return new MessagesMemDAO();
            case 'FS':
                Logger.info('Retornando instancia FS de Messages');
                return new MessagesFSDAO(); */
            case 'MONGO':
                Logger.info('Retornando instancia Mongo de Messages');
                return new MessagesMongoDAO();
            default:
                Logger.info('Retornando instancia Por defecto (Mongo) de Messages');
                return new MessagesMongoDAO();
        }
    }
}