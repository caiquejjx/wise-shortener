import { Url } from '../entities/url.entity';
import { UrlRepository } from '../repository/url.repository';
import { UrlService } from './url.service';
import MockDate from 'mockdate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('Url service', () => {
  let testingModule: TestingModule;
  let urlService: UrlService;
  let mockedRandom: string;

  beforeEach(async () => {
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
      ],
      providers: [UrlService],
    }).compile();

    urlService = testingModule.get(UrlService);
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    mockedRandom = Math.random().toString(36).substring(2, 8);
  });

  afterEach(async () => {
    await testingModule.close();
    jest.spyOn(global.Math, 'random').mockRestore();
    jest.spyOn(global, 'Date').mockRestore();
  });

  it('should correctly short a url', async () => {
    const requestUrl = 'http://localhost:8080/';

    const shortenedUrl = await urlService.shortUrl(
      requestUrl,
      'http://teste.com/teste',
    );

    expect(shortenedUrl).toEqual(requestUrl + mockedRandom);
  });
  it('should correctly save the expiration of the url', async () => {
    const requestUrl = 'http://localhost:8080/';

    const correctExpiration = new Date();

    correctExpiration.setDate(correctExpiration.getDate() + 1);

    await urlService.shortUrl(requestUrl, 'http://teste.com/teste');

    const createdUrl = await urlService.findShortUrlBySlug(mockedRandom);

    expect(createdUrl.expiration.getTime()).toBeLessThanOrEqual(
      correctExpiration.getTime(),
    );
  });

  it('should throw an error if the url is expired', async () => {
    const requestUrl = 'http://localhost:8080/';

    await urlService.shortUrl(requestUrl, 'http://teste.com/teste');

    MockDate.set('2021-02-25');

    await expect(urlService.findShortUrlBySlug(mockedRandom)).rejects.toThrow(
      'url expired',
    );
  });
});
