import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UrlResponseDTO {
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ description: 'A url encurtada' })
  newUrl: string;
}
