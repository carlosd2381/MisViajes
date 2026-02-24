import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnalyticsService } from './analytics.service';
import { DashboardController } from './dashboard.controller';
import { ReportsController } from './reports.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DashboardController, ReportsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
