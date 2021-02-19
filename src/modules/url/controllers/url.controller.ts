import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UrlRequestDTO } from '../dto/urlRequest.dto';
import { UrlResponseDTO } from '../dto/urlResponse.dto';
import { UrlService } from '../services/url.service';

@Controller()
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

  @Post('encurtador')
  async create(@Req() req: Request, @Body() urlReqDto: UrlRequestDTO) {
    // const urlObj = new UrlRequestDTO();
    // urlObj.url = req.body.url;

    const originalUrl = req.protocol + '://' + req.get('host') + '/';

    const newUrl = new UrlResponseDTO();

    newUrl.newUrl = await this.service.shortUrl(originalUrl, urlReqDto.url);

    return newUrl;
  }
}
