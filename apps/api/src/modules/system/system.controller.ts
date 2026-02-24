import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('health')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHealth() {
    return this.systemService.getHealth();
  }

  @Get('ready')
  getReadiness() {
    return this.systemService.getReadiness();
  }
}
