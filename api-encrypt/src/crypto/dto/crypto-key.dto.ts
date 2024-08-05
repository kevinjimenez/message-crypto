import { IsString } from 'class-validator';

export class CryptoKeyDto {
  @IsString()
  key: string;

  @IsString()
  iv: string;
}
