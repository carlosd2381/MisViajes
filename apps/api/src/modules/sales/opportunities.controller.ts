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
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateOpportunityStageDto } from './dto/update-opportunity-stage.dto';
import { OpportunitiesService } from './opportunities.service';

@UseGuards(JwtAuthGuard)
@Controller('pipeline/oportunidades')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findById(id);
  }

  @Post()
  create(@Body() body: CreateOpportunityDto) {
    return this.opportunitiesService.create(body);
  }

  @Patch(':id/etapa')
  updateStage(@Param('id') id: string, @Body() body: UpdateOpportunityStageDto) {
    return this.opportunitiesService.updateStage(id, body);
  }

  @Get(':id/cotizaciones')
  listQuotes(@Param('id') id: string) {
    return this.opportunitiesService.listQuotes(id);
  }

  @Post(':id/cotizaciones')
  createQuote(@Param('id') id: string, @Body() body: CreateQuoteDto) {
    return this.opportunitiesService.createQuote(id, body);
  }
}
