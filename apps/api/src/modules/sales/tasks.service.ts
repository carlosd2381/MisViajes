import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskPriority } from '../../common/enums/task-priority.enum';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { PrismaService } from '../database/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.task.findMany({
      include: { assignedTo: true, createdBy: true, opportunity: true },
      orderBy: [{ status: 'asc' }, { dueDate: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { assignedTo: true, createdBy: true, opportunity: true },
    });

    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }

    return task;
  }

  async create(input: CreateTaskDto, createdById?: string) {
    const assignedUser = await this.prisma.user.findUnique({ where: { id: input.assignedToId } });

    if (!assignedUser) {
      throw new NotFoundException('Usuario asignado no encontrado');
    }

    if (input.opportunityId) {
      const opportunity = await this.prisma.opportunity.findUnique({
        where: { id: input.opportunityId },
      });

      if (!opportunity) {
        throw new NotFoundException('Oportunidad no encontrada');
      }
    }

    return this.prisma.task.create({
      data: {
        title: input.title,
        assignedToId: input.assignedToId,
        description: input.description,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        priority: input.priority ?? TaskPriority.MEDIUM,
        status: input.status ?? TaskStatus.PENDING,
        relatedType: input.relatedType,
        relatedId: input.relatedId,
        opportunityId: input.opportunityId,
        createdById,
      },
      include: { assignedTo: true, createdBy: true, opportunity: true },
    });
  }

  async updateStatus(id: string, input: UpdateTaskStatusDto) {
    await this.findById(id);

    return this.prisma.task.update({
      where: { id },
      data: { status: input.status },
      include: { assignedTo: true, createdBy: true, opportunity: true },
    });
  }
}
