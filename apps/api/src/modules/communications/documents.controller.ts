import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentValidationDto } from './dto/update-document-validation.dto';
import { DocumentsService } from './documents.service';

@UseGuards(JwtAuthGuard)
@Controller('documentos')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  findAll() {
    return this.documentsService.findAll();
  }

  @Post()
  create(@Body() body: CreateDocumentDto) {
    return this.documentsService.create(body);
  }

  @Patch(':id/validacion')
  updateValidation(@Param('id') id: string, @Body() body: UpdateDocumentValidationDto) {
    return this.documentsService.updateValidation(id, body.validationStatus);
  }
}
