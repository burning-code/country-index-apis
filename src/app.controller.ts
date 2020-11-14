import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private healthCheckService: HealthCheckService,
    private dnsHealthIndicator: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.dnsHealthIndicator.pingCheck(
          '/api/countries',
          `${this.configService.get<string>(
            'APP_URL',
          )}/api/countries`,
        ),
    ]);
  }
}
