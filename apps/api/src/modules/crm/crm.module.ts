import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsController, LeadsController],
  providers: [ClientsService, LeadsService],
})
export class CrmModule {}
