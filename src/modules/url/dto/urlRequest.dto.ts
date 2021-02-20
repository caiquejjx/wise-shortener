import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UrlRequestDTO {
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'A url a ser encurtada',
  })
  url: string;
}
