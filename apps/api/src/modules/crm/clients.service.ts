import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return client;
  }

  create(input: CreateClientDto) {
    return this.prisma.client.create({
      data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      preferredMethod: input.preferredMethod,
      budgetRange: input.budgetRange,
      travelStyle: input.travelStyle,
      },
    });
  }
}
