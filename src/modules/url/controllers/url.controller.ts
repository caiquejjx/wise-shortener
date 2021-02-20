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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UrlRequestDTO } from '../dto/urlRequest.dto';
import { UrlResponseDTO } from '../dto/urlResponse.dto';
import { UrlService } from '../services/url.service';

@Controller()
export class UrlController {
  constructor(@Inject(UrlService) private service: UrlService) {}

  @ApiTags('endpoints')
  @ApiOperation({ summary: 'Redireciona para a url original' })
  @ApiResponse({ status: 400, description: 'Não encontrado' })
  @ApiResponse({ status: 498, description: 'Expirado' })
  @ApiResponse({ status: 302, description: 'Redirecionado com sucesso' })
  @ApiParam({
    type: String,
    name: 'slug',
    description: 'codigo da url encurtado',
    example: 'a123c6',
  })
  @Get(':slug')
  @Redirect('', 302)
  async find(@Param() params) {
    let result;

    try {
      result = await this.service.findShortUrlBySlug(params.slug);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

    if (!result) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return { url: result.originalUrl };
  }
  @ApiOperation({ summary: 'Encurta uma url' })
  @ApiResponse({
    status: 400,
    description: 'Erro caso a url não seja uma url ou esteja vazia',
  })
  @ApiCreatedResponse({
    description: 'A url foi encurtada com sucesso.',
    type: UrlResponseDTO,
  })
  @Post('encurtador')
  @ApiTags('endpoints')
  async create(@Req() req: Request, @Body() urlReqDto: UrlRequestDTO) {
    const requestUrl = req.protocol + '://' + req.get('host') + '/';

    const newUrl = new UrlResponseDTO();

    newUrl.newUrl = await this.service.shortUrl(requestUrl, urlReqDto.url);

    return newUrl;
  }
}
