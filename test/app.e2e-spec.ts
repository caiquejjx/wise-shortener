import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlRepository } from './../src/modules/url/repository/url.repository';
import { Url } from './../src/modules/url/entities/url.entity';
import { UrlController } from './../src/modules/url/controllers/url.controller';
import { UrlService } from './../src/modules/url/services/url.service';

describe('Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Url],
          dropSchema: true,
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([UrlRepository]),
      ],
      controllers: [UrlController],
      providers: [UrlService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test whole flux', async () => {
    const data = await request(app.getHttpServer())
      .post('/encurtador')
      .send({ url: 'http://teste.com' })
      .expect(201);

    await request(app.getHttpServer())
      .get('/' + data.body.newUrl.split('/').pop())
      .expect(302);
  });
});
