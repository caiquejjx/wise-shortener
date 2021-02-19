import { EntityRepository, Repository } from 'typeorm';
import { Url } from '../entities/url.entity';

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {
  async createNew(url: Url) {
    return await this.save(url);
  }

  async findBySlug(slug: string) {
    const existentUrl = await this.findOne({ where: { slug } });
    return existentUrl;
  }
}
