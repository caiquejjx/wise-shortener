// import {
//   IsString,
//   IsNotEmpty,
//   IsNumber,
//   Min,
//   IsOptional,
// } from 'class-validator';

// export class UrlRequest {
//   @IsString()
//   @IsNotEmpty()
//   originalUrl: string;

//   @IsString()
//   @IsNotEmpty()
//   shortenUrl: PixKeyKind;

//   @IsString()
//   @IsOptional()
//   description: string = null;

//   @IsNumber({ maxDecimalPlaces: 2 })
//   @Min(0.01)
//   @IsNotEmpty()
//   readonly amount: number;
// }
