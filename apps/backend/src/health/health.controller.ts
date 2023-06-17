import { Controller, Get, HttpCode } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealth: HttpHealthIndicator,
    private readonly databaseHealth: TypeOrmHealthIndicator,
    private readonly memoryHealth: MemoryHealthIndicator
  ) {}

  @Get()
  @HttpCode(200)
  @HealthCheck()
  healthCheck(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      async () => this.httpHealth.pingCheck('google', 'https://www.google.com'),
      async () => this.databaseHealth.pingCheck('database'),
      async () => this.databaseHealth.pingCheck('typeorm'),
      async () => this.memoryHealth.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => this.memoryHealth.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
