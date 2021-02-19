import { IsNotEmpty, IsUrl } from 'class-validator';

export class UrlRequestDTO {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
