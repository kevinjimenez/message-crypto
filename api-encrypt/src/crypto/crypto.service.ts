import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Cipher } from './../utils/cipher';
import { CryptoKeyDto } from './dto/crypto-key.dto';
const logger = new Logger('CryptoService');

@Injectable()
export class CryptoService {
  public async getKeys(type: 'iv' | 'key'): Promise<{ data: string }> {
    try {
      const data = await Cipher.readKey(type);
      return { data };
    } catch (error) {
      logger.verbose(`Error get key [${type}]`, { error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(
        error?.response?.message ?? `Error get [${type}] `,
      );
    }
  }

  public async createKeys(): Promise<CryptoKeyDto> {
    try {
      const key = await Cipher.generateKey('key');
      const iv = await Cipher.generateKey('iv');
      return { key, iv };
    } catch (error) {
      logger.verbose(`Error create keys`, { error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException('Error creating keys');
    }
  }
}
