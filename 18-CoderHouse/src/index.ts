import server from './services/server';
import { initMongoDB, /* initKnex */ } from './services/database';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const numCPUs = os.cpus().length;


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
    port:  process.env.PORT || '8080',
    cluster: false,
  },
};

const args = minimist(process.argv, optionalArgsObject);
export const puerto = args.port;


async function init() {

  //initKnex();
  await initMongoDB();


  const httpServer = server.listen(puerto, () => console.log('Server up en puerto', puerto));
  httpServer.on('error', (err) => console.log('ERROR (posiblemente puerto ocupado)', err));
}

if (cluster.isPrimary && args.cluster) {
  console.log('MODO CLUSTER!');
  console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    cluster.fork();
  });
} else {
  init();
}