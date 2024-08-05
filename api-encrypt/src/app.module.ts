import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CryptoModule } from './crypto/crypto.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
    CommonModule,
    HealthModule,
    TaskModule,
    CryptoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
