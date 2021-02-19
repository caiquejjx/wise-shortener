import { Server } from './server';

describe('Server instance', () => {
  let server;
  afterAll(
    async () => await server.getInternalServer().getHttpAdapter().close(),
  );

  it('should throw an error if the server is not built before started', () => {
    expect(function () {
      new Server().startServer();
    }).toThrow(
      "Server has to be built before started, use the static 'build' function before",
    );
  });
  //   it('should start server without error', async () => {
  //     server = await Server.build();
  //     expect(function () {
  //       server.startServer();
  //     }).not.toThrow();
  //   });
});
