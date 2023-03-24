import Server from "./services/server";
import config from './config';
import logger from './services/logger';
import mongoDBClient from './services/mongoDBClient';
import minimist from 'minimist';

const optionalArgsObject = {
    alias: {
        //Para pasar un alias a los argumentos que nos envian
        h: 'help',
        v: 'version',
        x: 'mialiasPersonalizado',
        m: 'message',
    },
    default: {
        //Si no nos envian el argumento, se setea por default
        port: process.env.PORT || '8080',
        cluster: false,
    },
};

const args = minimist(process.argv, optionalArgsObject);
const port = args.port;

const init = async () => {
    if (config.PERSISTENCIA === 'MONGO-ATLAS' || config.PERSISTENCIA === 'LOCAL-MONGO' ) await mongoDBClient.getConnection();
    const server = Server.listen(port, () => {
        logger.info(`Servidor escuchando en el puerto ${port}`);
    });

    server.on('error', (error) => logger.error(`Error en servidor: ${error}`));
};

init();