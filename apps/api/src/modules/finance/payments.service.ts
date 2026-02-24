import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '../../common/enums/payment-status.enum';
import { PrismaService } from '../database/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        trip: true,
      },
    });
  }

  create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        tripId: dto.tripId,
        clientId: dto.clientId,
        amount: dto.amount,
        method: dto.method,
        status: dto.status,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
        reference: dto.reference,
        notes: dto.notes,
      },
      include: {
        client: true,
        trip: true,
      },
    });
  }

  updateStatus(id: string, status: PaymentStatus) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status,
        paidAt: status === PaymentStatus.PAID ? new Date() : undefined,
      },
      include: {
        client: true,
        trip: true,
      },
    });
  }
}
