import { Injectable } from '@nestjs/common';
import { InvoiceStatus } from '../../common/enums/invoice-status.enum';
import { PrismaService } from '../database/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        trip: true,
      },
    });
  }

  create(dto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        tripId: dto.tripId,
        clientId: dto.clientId,
        status: dto.status,
        rfc: dto.rfc,
        cfdiUse: dto.cfdiUse,
        folio: dto.folio,
        uuid: dto.uuid,
        subtotal: dto.subtotal,
        iva: dto.iva,
        total: dto.total,
        issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
        pdfUrl: dto.pdfUrl,
        notes: dto.notes,
      },
      include: {
        client: true,
        trip: true,
      },
    });
  }

  updateStatus(id: string, status: InvoiceStatus) {
    return this.prisma.invoice.update({
      where: { id },
      data: {
        status,
        paidAt: status === InvoiceStatus.PAID ? new Date() : undefined,
      },
      include: {
        client: true,
        trip: true,
      },
    });
  }
}
