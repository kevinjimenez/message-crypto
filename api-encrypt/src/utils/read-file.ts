import { BadRequestException, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { IReadFile } from './../common/models/read-file.model';
const logger = new Logger('ReadFile');

export class ReadFile {
  public static async Pem({ filePath, fileName }: IReadFile): Promise<string> {
    try {
      const newFilePath = join(filePath, `${fileName}.pem`);
      const privateKey = await fs.readFile(newFilePath, 'utf-8');
      logger.log(`File read successfully [${fileName}].pem`);
      return privateKey;
    } catch (error) {
      logger.verbose(`Error reading file [${fileName}.pem]`, { error });
      throw new BadRequestException(`Error reading file [${fileName}.pem]`);
    }
  }
}
