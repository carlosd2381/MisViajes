import { Module } from '@nestjs/common';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { CommunicationsModule } from './modules/communications/communications.module';
import { CrmModule } from './modules/crm/crm.module';
import { FinanceModule } from './modules/finance/finance.module';
import { SalesModule } from './modules/sales/sales.module';
import { SystemModule } from './modules/system/system.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AnalyticsModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    CrmModule,
    BookingsModule,
    SalesModule,
    FinanceModule,
    CommunicationsModule,
    SystemModule,
  ],
})
export class AppModule {}
