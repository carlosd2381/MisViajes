import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentsController, InvoicesController],
  providers: [PaymentsService, InvoicesService],
})
export class FinanceModule {}
