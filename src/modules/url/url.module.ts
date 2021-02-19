import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './controllers/url.controller';
import { UrlRepository } from './repository/url.repository';
import { UrlService } from './services/url.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlRepository])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
