import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Redirect,
} from '@nestjs/common';
import { UrlService } from '../services/url.service';

@Controller('encurtador')
export class UrlController {
  constructor(@Inject(UrlService) private service: UrlService) {}

  @Get(':slug')
  @Redirect('', 302)
  async find(@Param() params) {
    const result = await this.service.findShortUrlBySlug(params.slug);

    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return { url: result.originalUrl };
  }
}
