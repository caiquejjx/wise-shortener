import { Server } from './server';

describe('Server instance', () => {
  it('should throw an error if the server is not built before started', () => {
    expect(function () {
      new Server().startServer();
    }).toThrow(
      "Server has to be built before started, use the static 'build' function before",
    );
  });
});
