import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationDto } from './../common/dto/pagination.dto';
import { RequestDecryptInterceptor } from './../common/interceptors/request-decrypt.interceptor';
import { ResponseEncryptInterceptor } from './../common/interceptors/response-encrypt.interceptor';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

// @UseInterceptors(ResponseEncryptInterceptor)
// @UseInterceptors(RequestDecryptInterceptor)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.taskService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.remove(id);
  }
}
