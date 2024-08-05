import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
const logger = new Logger('DecryptInterceptor');

@Injectable()
export class RequestDecryptInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    logger.warn('Decrypt');

    const request = context.switchToHttp().getRequest();

    if (
      request.method !== 'POST' &&
      request.method !== 'PATCH' &&
      request.method !== 'PUT'
    )
      return next.handle();
    //! aqui debe ir el decifrar de la informacion que viene del front cuando es POST
    // console.log('Antes', { body: request.body });
    // const clonedBody = structuredClone(request.body);
    // clonedBody.additionalProperty = 'newValue';
    // request.body = clonedBody;
    // console.log('despues', { body: request.body });

    return next.handle();
  }
}
