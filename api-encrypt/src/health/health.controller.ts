import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Health } from './models/health.model';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth(): Health {
    return this.healthService.checkStatus();
  }
}
