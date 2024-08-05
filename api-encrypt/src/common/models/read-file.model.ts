import { IExportFile } from './export-file.model';

export interface IReadFile extends Pick<IExportFile, 'filePath' | 'fileName'> {}
