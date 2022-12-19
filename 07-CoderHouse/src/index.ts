import server from './services/server';

const puerto = process.env.PORT || 8080;

const httpServer = server.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

httpServer.on('error', (err) => {
  console.log('ERROR (posiblemente puerto ocupado)', err);
});
  