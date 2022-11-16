import server from './services/server';
import { DBService } from './services/db';

const puerto = 8080;
DBService.init();

/* async function test(){
  const allProducts = await DBService.get('productos');
  console.table(allProducts);
}

test(); */

const httpServer = server.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

httpServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});
