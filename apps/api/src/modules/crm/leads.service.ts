import { Injectable, NotFoundException } from '@nestjs/common';
import { LeadStatus } from '../../common/enums/lead-status.enum';
import { PrismaService } from '../database/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ClientsService } from './clients.service';

@Injectable()
export class LeadsService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.lead.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!lead) {
      throw new NotFoundException('Lead no encontrado');
    }

    return lead;
  }

  async create(input: CreateLeadDto) {
    await this.clientsService.findById(input.clientId);

    return this.prisma.lead.create({
      data: {
        source: input.source,
        clientId: input.clientId,
        score: input.score,
        status: input.status ?? LeadStatus.NEW,
        expectedBudget: input.expectedBudget,
        timeline: input.timeline,
      },
      include: { client: true },
    });
  }
}
