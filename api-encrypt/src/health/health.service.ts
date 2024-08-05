import { Injectable } from '@nestjs/common';
import { Health } from './models/health.model';

@Injectable()
export class HealthService {
  public checkStatus(): Health {
    return {
      environment: process.env.NODE_ENV || 'local',
      message: `api-encrypt is up and running`,
      port: process.env.PORT || '3000',
    };
  }
}
