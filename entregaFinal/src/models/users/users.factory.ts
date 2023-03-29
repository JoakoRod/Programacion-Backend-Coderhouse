import Logger from '../../services/logger'
/* import UsuariosMemDAO from './memoria';
import UsuariosFSDAO from './fs'; */
import UsuariosMongoDAO from './DAOs/mongo';

export default class UsuariosFactoryDAO {
    static get(tipo: string) {
        switch (tipo) {
            /* case 'MEM':
                Logger.info('Retornando instancia Memoria de Usuarios');
                return new UsuariosMemDAO();
            case 'FS':
                Logger.info('Retornando instancia FS de Usuarios');
                return new UsuariosFSDAO(); */
            case 'MONGO':
                Logger.info('Retornando instancia Mongo de Usuarios');
                return new UsuariosMongoDAO();
            default:
                Logger.info('Retornando instancia Por defecto (Mongo) de Usuarios');
                return new UsuariosMongoDAO();
        }
    }
}