import server from './services/server';
import { initMongoDB, initKnex } from './services/database';
import config from './config/index';


async function init() {
  const puerto = config.PORT || 8080;
  initKnex();
  await initMongoDB();


  const httpServer = server.listen(puerto, () => console.log('Server up en puerto', puerto));
  httpServer.on('error', (err) => console.log('ERROR (posiblemente puerto ocupado)', err));
}

init();