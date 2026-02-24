import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OpportunitiesController, TasksController],
  providers: [OpportunitiesService, TasksService],
})
export class SalesModule {}
