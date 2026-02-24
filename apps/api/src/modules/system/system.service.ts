import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth() {
    const [
      users,
      clients,
      leads,
      trips,
      itineraryItems,
      opportunities,
      quotes,
      tasks,
      payments,
      invoices,
      communications,
      templates,
      documents,
    ] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.client.count(),
      this.prisma.lead.count(),
      this.prisma.trip.count(),
      this.prisma.itineraryItem.count(),
      this.prisma.opportunity.count(),
      this.prisma.quote.count(),
      this.prisma.task.count(),
      this.prisma.payment.count(),
      this.prisma.invoice.count(),
      this.prisma.communication.count(),
      this.prisma.messageTemplate.count(),
      this.prisma.document.count(),
    ]);

    const readiness = await this.getReadiness();

    return {
      status: 'ok',
      service: 'misviajes-api',
      now: new Date().toISOString(),
      db: readiness.db,
      counts: {
        users,
        clients,
        leads,
        trips,
        itineraryItems,
        opportunities,
        quotes,
        tasks,
        payments,
        invoices,
        communications,
        templates,
        documents,
      },
    };
  }

  async getReadiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ready',
        db: 'up',
        now: new Date().toISOString(),
      };
    } catch {
      return {
        status: 'not-ready',
        db: 'down',
        now: new Date().toISOString(),
      };
    }
  }
}
