import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { NestApplication } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Server {
  private server: NestApplication;
  private readonly logger = new Logger(Server.name);

  constructor(private port?: number) {}

  public static build = async (port?: number) => {
    const server = new Server(port);
    server.server = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Wise Shortener')
      .setDescription('Encurtador de urls')
      .setVersion('1.0')
      .addTag('Endpoints')
      .build();
    const document = SwaggerModule.createDocument(server.server, config);
    SwaggerModule.setup('docs', server.server, document);

    return server;
  };

  public startServer() {
    if (!this.server)
      throw new Error(
        "Server has to be built before started, use the static 'build' function before",
      );
    this.server.listen(this.port || 3000);
    this.server.enableCors();
    this.server.useGlobalPipes(new ValidationPipe());

    this.logger.log(`Server running at port ${this.port || 3000}`);
  }

  public getInternalServer(): NestApplication {
    return this.server;
  }
}
