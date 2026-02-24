import { Injectable } from '@nestjs/common';
import { LeadStatus } from '../../common/enums/lead-status.enum';
import { OpportunityStage } from '../../common/enums/opportunity-stage.enum';
import { PaymentStatus } from '../../common/enums/payment-status.enum';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { TripStatus } from '../../common/enums/trip-status.enum';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  private startOfDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  private endOfDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }

  private startOfMonth(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  }

  private endOfMonth(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  }

  private toNumber(value: unknown) {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'bigint') return Number(value);
    if (typeof value === 'string') return Number(value);
    if (typeof value === 'object' && value && 'toString' in value) {
      return Number((value as { toString: () => string }).toString());
    }

    return 0;
  }

  async getDashboardSummary() {
    const now = new Date();
    const dayStart = this.startOfDay(now);
    const dayEnd = this.endOfDay(now);
    const monthStart = this.startOfMonth(now);
    const monthEnd = this.endOfMonth(now);
    const sixMonthsFromNow = new Date(now);
    sixMonthsFromNow.setDate(sixMonthsFromNow.getDate() + 180);

    const stages = Object.values(OpportunityStage);
    const pipelineCountPromises = stages.map((stage) =>
      this.prisma.opportunity.count({ where: { stage } }),
    );

    const [
      tareasHoy,
      pagosHoy,
      salidasHoy,
      pagosVencidos,
      docsPasaportePorVencer,
      docsPendientes,
      reservasMes,
      leadsTotales,
      leadsConvertidos,
      pagosMes,
      ...pipelineCounts
    ] = await this.prisma.$transaction([
      this.prisma.task.count({
        where: {
          dueDate: { gte: dayStart, lte: dayEnd },
          status: { notIn: [TaskStatus.COMPLETED, TaskStatus.CANCELLED] },
        },
      }),
      this.prisma.payment.count({
        where: {
          dueDate: { gte: dayStart, lte: dayEnd },
          status: { in: [PaymentStatus.PENDING, PaymentStatus.PARTIAL, PaymentStatus.OVERDUE] },
        },
      }),
      this.prisma.trip.count({
        where: {
          startDate: { gte: dayStart, lte: dayEnd },
          status: { notIn: [TripStatus.CANCELLED] },
        },
      }),
      this.prisma.payment.count({
        where: {
          OR: [
            { status: PaymentStatus.OVERDUE },
            {
              dueDate: { lt: now },
              status: { in: [PaymentStatus.PENDING, PaymentStatus.PARTIAL] },
            },
          ],
        },
      }),
      this.prisma.document.count({
        where: {
          docType: 'PASSPORT',
          expiresAt: { gte: now, lte: sixMonthsFromNow },
        },
      }),
      this.prisma.document.count({
        where: {
          validationStatus: 'PENDING',
        },
      }),
      this.prisma.trip.count({
        where: {
          createdAt: { gte: monthStart, lte: monthEnd },
          status: {
            in: [
              TripStatus.CONFIRMED,
              TripStatus.FINALIZED,
              TripStatus.IN_PROGRESS,
              TripStatus.COMPLETED,
            ],
          },
        },
      }),
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: LeadStatus.CONVERTED } }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          status: PaymentStatus.PAID,
          paidAt: { gte: monthStart, lte: monthEnd },
        },
      }),
      ...pipelineCountPromises,
    ]);

    const conversionRate = leadsTotales > 0 ? (leadsConvertidos / leadsTotales) * 100 : 0;

    const pipeline = stages.reduce<Record<string, number>>((acc, stage, index) => {
      acc[stage] = pipelineCounts[index] ?? 0;
      return acc;
    }, {});

    return {
      myDay: {
        tareasPendientesHoy: tareasHoy,
        pagosPorVencerHoy: pagosHoy,
        salidasHoy,
      },
      pipeline,
      alertas: {
        pagosVencidos,
        pasaportesPorVencer6Meses: docsPasaportePorVencer,
        documentosPendientesValidacion: docsPendientes,
      },
      performance: {
        reservasMes,
        conversionLeadsPct: Number(conversionRate.toFixed(2)),
        ingresosCobradosMes: this.toNumber(pagosMes._sum.amount),
      },
      specialDates: {
        cumpleaniosHoy: 0,
        aniversariosHoy: 0,
        note: 'Pendiente de modelado de fechas especiales en perfil cliente',
      },
      now: now.toISOString(),
    };
  }

  async getReportsSummary() {
    const now = new Date();
    const monthStart = this.startOfMonth(now);
    const monthEnd = this.endOfMonth(now);

    const stages = Object.values(OpportunityStage);
    const pipelineCountPromises = stages.map((stage) =>
      this.prisma.opportunity.count({ where: { stage } }),
    );

    const [
      totalReservas,
      reservasCompletadas,
      totalLeads,
      leadsConvertidos,
      ventasMes,
      pendientesCobro,
      tareasVencidas,
      ...pipelineCounts
    ] = await this.prisma.$transaction([
      this.prisma.trip.count(),
      this.prisma.trip.count({ where: { status: TripStatus.COMPLETED } }),
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: LeadStatus.CONVERTED } }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          status: PaymentStatus.PAID,
          paidAt: { gte: monthStart, lte: monthEnd },
        },
      }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          status: { in: [PaymentStatus.PENDING, PaymentStatus.PARTIAL, PaymentStatus.OVERDUE] },
        },
      }),
      this.prisma.task.count({
        where: {
          dueDate: { lt: now },
          status: { in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS] },
        },
      }),
      ...pipelineCountPromises,
    ]);

    const pipeline = stages.reduce<Record<string, number>>((acc, stage, index) => {
      acc[stage] = pipelineCounts[index] ?? 0;
      return acc;
    }, {});

    return {
      ventas: {
        reservasTotales: totalReservas,
        reservasCompletadas,
        conversionLeadsPct:
          totalLeads > 0 ? Number(((leadsConvertidos / totalLeads) * 100).toFixed(2)) : 0,
        ingresosCobradosMes: this.toNumber(ventasMes._sum.amount),
        cuentasPorCobrar: this.toNumber(pendientesCobro._sum.amount),
      },
      operacion: {
        tareasVencidas,
      },
      pipeline,
      now: now.toISOString(),
    };
  }

  async getMobileSummary() {
    const now = new Date();
    const dayStart = this.startOfDay(now);
    const dayEnd = this.endOfDay(now);
    const soonLimit = new Date(now);
    soonLimit.setDate(soonLimit.getDate() + 2);

    const [tareasHoy, salidasProximas, clientesRecientes, pagosUrgentes, docsPendientes] =
      await this.prisma.$transaction([
        this.prisma.task.findMany({
          where: {
            dueDate: { gte: dayStart, lte: dayEnd },
            status: { in: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS] },
          },
          include: { assignedTo: true },
          orderBy: [{ dueDate: 'asc' }, { createdAt: 'desc' }],
          take: 8,
        }),
        this.prisma.trip.findMany({
          where: {
            startDate: { gte: dayStart, lte: soonLimit },
            status: { not: TripStatus.CANCELLED },
          },
          include: { client: true },
          orderBy: { startDate: 'asc' },
          take: 8,
        }),
        this.prisma.client.findMany({
          orderBy: { updatedAt: 'desc' },
          take: 8,
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
            preferredMethod: true,
          },
        }),
        this.prisma.payment.count({
          where: {
            OR: [
              { status: PaymentStatus.OVERDUE },
              {
                dueDate: { lt: now },
                status: { in: [PaymentStatus.PENDING, PaymentStatus.PARTIAL] },
              },
            ],
          },
        }),
        this.prisma.document.count({
          where: { validationStatus: 'PENDING' },
        }),
      ]);

    return {
      resumen: {
        tareasHoy: tareasHoy.length,
        salidasProximas: salidasProximas.length,
        clientesRecientes: clientesRecientes.length,
      },
      alertas: {
        pagosUrgentes,
        documentosPendientes: docsPendientes,
      },
      tareasHoy: tareasHoy.map((task) => ({
        id: task.id,
        titulo: task.title,
        estado: task.status,
        vence: task.dueDate?.toISOString() ?? null,
        asignadoA: task.assignedTo.fullName,
      })),
      salidasProximas: salidasProximas.map((trip) => ({
        id: trip.id,
        viaje: trip.title,
        cliente: trip.client.fullName,
        fechaSalida: trip.startDate?.toISOString() ?? null,
        estado: trip.status,
      })),
      clientesRecientes: clientesRecientes.map((client) => ({
        id: client.id,
        nombre: client.fullName,
        telefono: client.phone,
        email: client.email,
        contactoPreferido: client.preferredMethod,
      })),
      now: now.toISOString(),
    };
  }
}
