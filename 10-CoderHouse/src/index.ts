import server from './services/server';
import { initMongoDB } from './services/database';


async function init() {
  const puerto = process.env.PORT || 8080;
  await initMongoDB();

  const httpServer = server.listen(puerto, () => console.log('Server up en puerto', puerto));
  httpServer.on('error', (err) => console.log('ERROR (posiblemente puerto ocupado)', err));
}

init();