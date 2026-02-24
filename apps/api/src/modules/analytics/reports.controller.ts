import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('reportes')
export class ReportsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('resumen')
  getSummary() {
    return this.analyticsService.getReportsSummary();
  }
}
