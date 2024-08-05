import { BadRequestException, HttpException, Logger } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { ExportFile } from './export-file';
import { ReadFile } from './read-file';
const logger = new Logger('Cipher');

export class Cipher {
  public static async generateKey(name: string): Promise<string> {
    try {
      const keyBytes = CryptoJS.lib.WordArray.random(32);
      const keyString = CryptoJS.enc.Hex.stringify(keyBytes);

      const keyFile = await ExportFile.Pem({
        fileName: name,
        filePath: __dirname,
        data: keyString,
      });

      if (!keyFile) {
        logger.verbose(`Key empty [${name}].pem`, { keyFile });
        throw new BadRequestException(`File empty [${name}.pem]`);
      }
      return keyString;
    } catch (error) {
      logger.verbose(`Error generate key [${name}].pem`, { error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(`Error creating file [${name}.pem]`);
    }
  }

  public static async readKey(name: string): Promise<string> {
    try {
      const content = await ReadFile.Pem({
        filePath: __dirname,
        fileName: name,
      });
      return content;
    } catch (error) {
      logger.verbose(`Error read key [${name}].pem`, { error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(`Error reading file [${name}.pem]`);
    }
  }

  public static async encrypt(text: string) {
    try {
      const keyFileContent = await this.readKey('key');
      const key = CryptoJS.enc.Hex.parse(keyFileContent);

      const options = await this.getOptions();

      const cipherBytes = CryptoJS.AES.encrypt(text, key, options);
      return cipherBytes.toString();
    } catch (error) {
      logger.verbose(`Error encrypt data`, {
        error,
      });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(`Error encrypt data`);
    }
  }

  public static async decrypt(text: string) {
    try {
      const keyFileContent = await this.readKey('key');
      const key = CryptoJS.enc.Hex.parse(keyFileContent);

      const options = await this.getOptions();

      const cipherBytes = CryptoJS.AES.decrypt(text, key, options);
      return cipherBytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      logger.verbose(`Error decrypt data`, {
        error,
      });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(`Error decrypt data`);
    }
  }

  private static async getOptions() {
    try {
      const ivFileContent = await this.readKey('iv');
      const iv = CryptoJS.enc.Hex.parse(ivFileContent);
      const options = {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      };
      return options;
    } catch (error) {
      logger.verbose(`Error get options by create encrypt or decrypt`, {
        error,
      });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(
        `Error get options by create encrypt or decrypt`,
      );
    }
  }
}
