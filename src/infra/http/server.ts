import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { NestApplication } from '@nestjs/core';

export class Server {
  private server: NestApplication;

  constructor(private port?: number) {}

  public static build = async (port?: number) => {
    const server = new Server(port);
    server.server = await NestFactory.create(AppModule);
    return server;
  };

  public startServer() {
    if (!this.server)
      throw new Error(
        "Server has to be built before started, use the static 'build' function before",
      );
    this.server.listen(this.port || 3000);

    console.log(`Server running at ${this.port || 3000}`);
  }

  public getInternalServer(): NestApplication {
    return this.server;
  }
}
