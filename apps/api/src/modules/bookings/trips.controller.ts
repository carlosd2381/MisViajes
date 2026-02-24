import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateItineraryItemDto } from './dto/create-itinerary-item.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';
import { UpdateTripStatusDto } from './dto/update-trip-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('reservas/viajes')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findById(id);
  }

  @Post()
  create(@Body() body: CreateTripDto) {
    return this.tripsService.create(body);
  }

  @Get(':id/itinerario')
  listItems(@Param('id') id: string) {
    return this.tripsService.listItems(id);
  }

  @Post(':id/itinerario')
  addItem(@Param('id') id: string, @Body() body: CreateItineraryItemDto) {
    return this.tripsService.addItem(id, body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateTripStatusDto) {
    return this.tripsService.updateStatus(id, body);
  }
}
