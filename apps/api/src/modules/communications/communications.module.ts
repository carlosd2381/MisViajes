import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CommunicationsController } from './communications.controller';
import { CommunicationsService } from './communications.service';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CommunicationsController, TemplatesController, DocumentsController],
  providers: [CommunicationsService, TemplatesService, DocumentsService],
})
export class CommunicationsModule {}
