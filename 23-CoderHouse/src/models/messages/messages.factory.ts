import MessagesAtlasDAO from './DAOs/mongo.dao';
import { Logger } from '../../services/logger';
import { PersistenceType } from '../../config';

export type MessagesDAO = MessagesAtlasDAO /* | ProductosMemDAO | ProductosFSDAO */;

export class MessagesFactoryDAO {
  static get(type: PersistenceType) {
    switch (type) {
      /* case PersistenceType.Memoria:
        Logger.info('Retornando Instancia Messages Memoria');
        return MessagesMemDAO.getInstance(); */

      /* case PersistenceType.FileSystem:
        Logger.info('Retornando Instancia Messages File System');
        return MessagesFSDAO.getInstance(); */

      case PersistenceType.MongoAtlas:
        Logger.info('Retornando Instancia Messages Mongo Atlas');
        return MessagesAtlasDAO.getInstance();

      case PersistenceType.LocalMongo:
        Logger.info('Retornando Instancia Messages Mongo Local');
        return MessagesAtlasDAO.getInstance(true);

      default:
        Logger.info('Retornando Instancia Messages Default');
        return MessagesAtlasDAO.getInstance();
    }
  }
}