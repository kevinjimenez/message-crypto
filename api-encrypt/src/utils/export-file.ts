import { BadRequestException, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { IExportFile } from './../common/models/export-file.model';
const logger = new Logger('ExportFile');

export class ExportFile {
  public static async Pem({
    fileName,
    filePath,
    data,
  }: IExportFile): Promise<boolean> {
    try {
      const newFilePath = join(filePath, `${fileName}.pem`);
      await fs.writeFile(newFilePath, data);
      logger.log(`File created successfully [${fileName}.pem]`);
      return true;
    } catch (error) {
      logger.verbose(`Error created file [${fileName}.pem]`, { error });
      throw new BadRequestException(`Error created file [${fileName}.pem]`);
    }
  }
}
