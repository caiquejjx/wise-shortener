import { Inject, Injectable } from '@nestjs/common';
import { Url } from '../entities/url.entity';
import { UrlRepository } from '../repository/url.repository';

@Injectable()
export class UrlService {
  constructor(@Inject(UrlRepository) private repository: UrlRepository) {}

  async shortUrl(requestUrl: string, originalUrl: string) {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);

    const slug = Math.random().toString(36).substring(2, 8);

    const shortenedUrl = requestUrl + slug;

    const url = new Url();
    url.originalUrl = originalUrl;
    url.shortenedUrl = shortenedUrl;
    url.slug = slug;
    url.expiration = expiration;

    await this.repository.createNew(url);

    return shortenedUrl;
  }

  async findShortUrlBySlug(slug: string) {
    const existentUrl = await this.repository.findBySlug(slug);
    const today = new Date();

    if (new Date(existentUrl?.expiration) < today) {
      throw new Error('url expired');
    }

    return existentUrl;
  }
}
