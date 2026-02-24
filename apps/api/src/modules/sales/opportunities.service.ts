import { Injectable, NotFoundException } from '@nestjs/common';
import { OpportunityStage } from '../../common/enums/opportunity-stage.enum';
import { PrismaService } from '../database/prisma.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateOpportunityStageDto } from './dto/update-opportunity-stage.dto';

@Injectable()
export class OpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.opportunity.findMany({
      include: { client: true, lead: true, trip: true, quotes: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const opportunity = await this.prisma.opportunity.findUnique({
      where: { id },
      include: { client: true, lead: true, trip: true, quotes: true },
    });

    if (!opportunity) {
      throw new NotFoundException('Oportunidad no encontrada');
    }

    return opportunity;
  }

  async create(input: CreateOpportunityDto) {
    const client = await this.prisma.client.findUnique({ where: { id: input.clientId } });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    if (input.leadId) {
      const lead = await this.prisma.lead.findUnique({ where: { id: input.leadId } });
      if (!lead) throw new NotFoundException('Lead no encontrado');
    }

    if (input.tripId) {
      const trip = await this.prisma.trip.findUnique({ where: { id: input.tripId } });
      if (!trip) throw new NotFoundException('Viaje no encontrado');
    }

    if (input.assignedAgentId) {
      const user = await this.prisma.user.findUnique({ where: { id: input.assignedAgentId } });
      if (!user) throw new NotFoundException('Agente asignado no encontrado');
    }

    return this.prisma.opportunity.create({
      data: {
        title: input.title,
        clientId: input.clientId,
        leadId: input.leadId,
        tripId: input.tripId,
        assignedAgentId: input.assignedAgentId,
        stage: input.stage ?? OpportunityStage.NEW,
        dealValue: input.dealValue,
        probability: input.probability,
        expectedCloseDate: input.expectedCloseDate
          ? new Date(input.expectedCloseDate)
          : undefined,
        competitorNotes: input.competitorNotes,
      },
      include: { client: true, lead: true, trip: true, quotes: true },
    });
  }

  async updateStage(id: string, input: UpdateOpportunityStageDto) {
    await this.findById(id);

    return this.prisma.opportunity.update({
      where: { id },
      data: { stage: input.stage },
      include: { client: true, lead: true, trip: true, quotes: true },
    });
  }

  async listQuotes(opportunityId: string) {
    await this.findById(opportunityId);

    return this.prisma.quote.findMany({
      where: { opportunityId },
      orderBy: { version: 'asc' },
    });
  }

  async createQuote(opportunityId: string, input: CreateQuoteDto) {
    await this.findById(opportunityId);

    const latest = await this.prisma.quote.findFirst({
      where: { opportunityId },
      orderBy: { version: 'desc' },
    });

    const version = (latest?.version ?? 0) + 1;

    return this.prisma.quote.create({
      data: {
        opportunityId,
        version,
        title: input.title,
        amount: input.amount,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
        notes: input.notes,
      },
    });
  }
}
