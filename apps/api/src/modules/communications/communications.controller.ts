import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { CommunicationsService } from './communications.service';

@UseGuards(JwtAuthGuard)
@Controller('comunicaciones')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Get()
  findAll() {
    return this.communicationsService.findAll();
  }

  @Post()
  create(@Body() body: CreateCommunicationDto) {
    return this.communicationsService.create(body);
  }
}
