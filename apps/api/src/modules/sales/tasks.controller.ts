import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('tareas')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @Post()
  create(
    @Body() body: CreateTaskDto,
    @Req() request: { user?: { sub?: string } },
  ) {
    return this.tasksService.create(body, request.user?.sub);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateTaskStatusDto) {
    return this.tasksService.updateStatus(id, body);
  }
}
