import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('resumen')
  getSummary() {
    return this.analyticsService.getDashboardSummary();
  }

  @Get('movil')
  getMobileSummary() {
    return this.analyticsService.getMobileSummary();
  }
}
