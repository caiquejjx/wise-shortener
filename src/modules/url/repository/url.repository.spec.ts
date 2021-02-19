import { Url } from '../entities/url.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UrlRepository } from './url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Url repository', () => {
  let urlRepository: UrlRepository;
  let testingModule: TestingModule;
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
    }).compile();
    urlRepository = testingModule.get(UrlRepository);
  });
  afterAll(() => testingModule.close());

  it('should create a new url', async () => {
    const newUrl = new Url();
    newUrl.originalUrl = 'a';
    newUrl.shortenedUrl = 'b';
    newUrl.slug = 'f';
    newUrl.expiration = new Date();

    const createdUrl = await urlRepository.createNew(newUrl);
    expect(createdUrl.id).toBeDefined();
    const newUrlInDB = await urlRepository.findBySlug(createdUrl.slug);
    expect(newUrlInDB.slug).toBe(newUrl.slug);
  });
});
