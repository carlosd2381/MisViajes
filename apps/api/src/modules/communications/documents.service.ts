import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DocumentValidationStatus } from '../../common/enums/document-validation-status.enum';
import { PrismaService } from '../database/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.document.findMany({
      include: {
        client: true,
        trip: true,
      },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  async create(input: CreateDocumentDto) {
    if (!input.clientId && !input.tripId) {
      throw new BadRequestException('Documento debe relacionarse con cliente o viaje');
    }

    if (input.clientId) {
      const client = await this.prisma.client.findUnique({ where: { id: input.clientId } });
      if (!client) throw new NotFoundException('Cliente no encontrado');
    }

    if (input.tripId) {
      const trip = await this.prisma.trip.findUnique({ where: { id: input.tripId } });
      if (!trip) throw new NotFoundException('Viaje no encontrado');
    }

    return this.prisma.document.create({
      data: {
        clientId: input.clientId,
        tripId: input.tripId,
        category: input.category,
        docType: input.docType,
        validationStatus: input.validationStatus,
        title: input.title,
        fileName: input.fileName,
        fileUrl: input.fileUrl,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
        notes: input.notes,
      },
      include: {
        client: true,
        trip: true,
      },
    });
  }

  async updateValidation(id: string, validationStatus: DocumentValidationStatus) {
    const document = await this.prisma.document.findUnique({ where: { id } });
    if (!document) throw new NotFoundException('Documento no encontrado');

    return this.prisma.document.update({
      where: { id },
      data: { validationStatus },
      include: {
        client: true,
        trip: true,
      },
    });
  }
}
