import { Injectable, NotFoundException } from '@nestjs/common';
import { TripStatus } from '../../common/enums/trip-status.enum';
import { PrismaService } from '../database/prisma.service';
import { CreateItineraryItemDto } from './dto/create-itinerary-item.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripStatusDto } from './dto/update-trip-status.dto';

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.trip.findMany({
      include: {
        client: true,
        itineraryItems: { orderBy: { dayNumber: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id },
      include: {
        client: true,
        itineraryItems: { orderBy: { dayNumber: 'asc' } },
      },
    });

    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }

    return trip;
  }

  async create(input: CreateTripDto) {
    const client = await this.prisma.client.findUnique({ where: { id: input.clientId } });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return this.prisma.trip.create({
      data: {
        title: input.title,
        clientId: input.clientId,
        status: input.status ?? TripStatus.INQUIRY,
        startDate: input.startDate ? new Date(input.startDate) : undefined,
        endDate: input.endDate ? new Date(input.endDate) : undefined,
        notes: input.notes,
      },
      include: {
        client: true,
        itineraryItems: true,
      },
    });
  }

  async addItem(tripId: string, input: CreateItineraryItemDto) {
    await this.findById(tripId);

    return this.prisma.itineraryItem.create({
      data: {
        tripId,
        dayNumber: input.dayNumber,
        itemType: input.itemType,
        title: input.title,
        description: input.description,
        startTime: input.startTime,
        endTime: input.endTime,
        confirmation: input.confirmation,
        providerName: input.providerName,
        location: input.location,
      },
    });
  }

  async listItems(tripId: string) {
    await this.findById(tripId);

    return this.prisma.itineraryItem.findMany({
      where: { tripId },
      orderBy: [{ dayNumber: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async updateStatus(tripId: string, input: UpdateTripStatusDto) {
    await this.findById(tripId);

    return this.prisma.trip.update({
      where: { id: tripId },
      data: { status: input.status },
      include: {
        client: true,
        itineraryItems: { orderBy: { dayNumber: 'asc' } },
      },
    });
  }
}
