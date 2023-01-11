import server from './services/server';
import { initMongoDB, initKnex } from './services/database';
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
    port: '8080',
    cluster: false,
  },
};

const args = minimist(process.argv, optionalArgsObject);


async function init() {
  const puerto = args.port;
  initKnex();
  await initMongoDB();


  const httpServer = server.listen(puerto, () => console.log('Server up en puerto', puerto));
  httpServer.on('error', (err) => console.log('ERROR (posiblemente puerto ocupado)', err));
}

init();