import { Url } from '../entities/url.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { UrlRepository } from '../repository/url.repository';
import { HttpModule, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UrlService } from '../services/url.service';

describe('Url controller', () => {
  let testingModule: TestingModule;
  let app: INestApplication;
  let mockedRandom;
  beforeEach(async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    mockedRandom = Math.random().toString(36).substring(2, 8);

    const mockUrlService = {
      findShortUrlBySlug: jest.fn().mockImplementation(() => {
        throw new Error('url expired');
      }),
      shortUrl: jest
        .fn()
        .mockResolvedValue('http://localhost:8080/' + mockedRandom),
    };

    testingModule = await Test.createTestingModule({
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
        HttpModule,
      ],
      controllers: [UrlController],
      providers: [{ provide: UrlService, useValue: mockUrlService }],
    }).compile();
    app = testingModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterEach(async () => await testingModule.close());

  it('should return a new url by a post request', async () => {
    const expectedUrl = 'http://localhost:8080/' + mockedRandom;

    const data = await request(app.getHttpServer())
      .post('/encurtador')
      .send({ url: 'http://teste.com' })
      .expect(201);
    expect(data.body).toHaveProperty('newUrl');
    expect(data.body.newUrl).toEqual(expectedUrl);
  });

  it('should throw an error when the body url is not a url or is empty', async () => {
    await request(app.getHttpServer())
      .post('/encurtador')
      .send({ url: 'teste' })
      .expect(400);

    await request(app.getHttpServer())
      .post('/encurtador')
      .send({ url: '' })
      .expect(400);
  });

  it('should throw an error when the url is expired', async () => {
    const urlController = testingModule.get(UrlController);

    await expect(urlController.find('4fzzzx')).rejects.toThrow('url expired');
  });

  it('should throw an error when the url is not found', async () => {
    const repository = testingModule.get(UrlRepository);
    const service = new UrlService(repository);
    const urlController = new UrlController(service);

    await expect(urlController.find('abcde')).rejects.toThrow('Not Found');
  });
});
