import { Server } from './infra/http/server';

(async function () {
  const server = await Server.build(parseInt(process.env.PORT));
  server.startServer();
})();
