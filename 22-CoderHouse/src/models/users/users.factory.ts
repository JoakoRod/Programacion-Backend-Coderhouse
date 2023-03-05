import UsersAtlasDAO from './DAOs/mongo.dao';
import { Logger } from '../../services/logger';
import { PersistenceType } from '../../config';

export type UsersDAO = UsersAtlasDAO /* | UsersMemDAO | UsersFSDAO */;

export class UsersFactoryDAO {
  static get(type: PersistenceType) {
    switch (type) {
      /* case PersistenceType.Memoria:
        Logger.info('Retornando Instancia Users Memoria');
        return UsersMemDAO.getInstance(); */

      /* case PersistenceType.FileSystem:
        Logger.info('Retornando Instancia Users File System');
        return UsersFSDAO.getInstance(); */

      case PersistenceType.MongoAtlas:
        Logger.info('Retornando Instancia Users Mongo Atlas');
        return UsersAtlasDAO.getInstance();

      case PersistenceType.LocalMongo:
        Logger.info('Retornando Instancia Users Mongo Local');
        return UsersAtlasDAO.getInstance(true);

      default:
        Logger.info('Retornando Instancia Users Default');
        return UsersAtlasDAO.getInstance();
    }
  }
}