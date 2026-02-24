import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.messageTemplate.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(input: CreateMessageTemplateDto) {
    return this.prisma.messageTemplate.create({
      data: {
        key: input.key,
        name: input.name,
        channel: input.channel,
        language: input.language,
        subject: input.subject,
        body: input.body,
        isActive: input.isActive,
      },
    });
  }
}
