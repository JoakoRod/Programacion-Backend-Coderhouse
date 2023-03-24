import UsersAtlasDAO from './DAOs/mongo.dao';
import logger from '../../services/logger';
import { PersistenceType } from '../../config';

export type UsersDAO = UsersAtlasDAO /* | UsersMemDAO | UsersFSDAO */;

export class UsersFactoryDAO {
  static get(type: PersistenceType) {
    switch (type) {
      /* case PersistenceType.Memoria:
        logger.info('Retornando Instancia Users Memoria');
        return UsersMemDAO.getInstance(); */

      /* case PersistenceType.FileSystem:
        logger.info('Retornando Instancia Users File System');
        return UsersFSDAO.getInstance(); */

      case PersistenceType.MongoAtlas || PersistenceType.LocalMongo:
        logger.info('Retornando Instancia Users Mongo Atlas');
        return UsersAtlasDAO.getInstance();

      default:
        logger.info('Retornando Instancia Users Default');
        return UsersAtlasDAO.getInstance();
    }
  }
}