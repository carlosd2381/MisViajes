import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';

@Injectable()
export class CommunicationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.communication.findMany({
      include: {
        client: true,
        trip: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(input: CreateCommunicationDto) {
    const client = await this.prisma.client.findUnique({ where: { id: input.clientId } });
    if (!client) throw new NotFoundException('Cliente no encontrado');

    if (input.tripId) {
      const trip = await this.prisma.trip.findUnique({ where: { id: input.tripId } });
      if (!trip) throw new NotFoundException('Viaje no encontrado');
    }

    return this.prisma.communication.create({
      data: {
        clientId: input.clientId,
        tripId: input.tripId,
        channel: input.channel,
        direction: input.direction,
        language: input.language,
        subject: input.subject,
        message: input.message,
        templateKey: input.templateKey,
        externalId: input.externalId,
        sentAt: input.sentAt ? new Date(input.sentAt) : undefined,
      },
      include: {
        client: true,
        trip: true,
      },
    });
  }
}
