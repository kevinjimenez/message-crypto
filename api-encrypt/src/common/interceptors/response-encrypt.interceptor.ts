import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, from, map, switchMap } from 'rxjs';
import { Cipher } from './../../utils/cipher';
import { ICipher } from '../models/cipher.model';
const logger = new Logger('EncryptInterceptor');

@Injectable()
export class ResponseEncryptInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<ICipher> {
    logger.warn('Encrypt');

    return next.handle().pipe(
      switchMap((data) => {
        let message = data;
        if (data instanceof Object) {
          message = JSON.stringify(data);
        }

        return from(Cipher.encrypt(message));
      }),
      switchMap((data) => {
        return this.encryptResponse(data);
      }),
    );
  }

  private encryptResponse(message: string): Observable<ICipher> {
    const iv$ = from(Cipher.readKey('iv'));
    return iv$.pipe(map((iv) => ({ iv, message })));
  }
}
