import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PaginationDto } from './../common/dto/pagination.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './repositories/task.repository';
const logger = new Logger('TaskService');

@Injectable()
export class TaskService {
  constructor(private readonly _taskRepository: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this._taskRepository.create(createTaskDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this._taskRepository.find(paginationDto);
  }

  findOne(id: string) {
    return this._taskRepository.findOneById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    //! mejora control try-catch para no realizar una consulta a la base innecesaria
    try {
      await this.findOne(id);
      return this._taskRepository.updateOneById(id, updateTaskDto);
    } catch (error) {
      logger.verbose(`Error update task [${id}]`, { error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(`Error update task [${id}]`);
    }
  }

  async remove(id: string) {
    //! mejora control try-catch para no realizar una consulta a la base innecesaria
    try {
      await this.findOne(id);
      return this._taskRepository.deleteOneById(id);
    } catch (error) {
      logger.verbose(`Error remove task [${id}]`, { error });
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(`Error remove task [${id}]`);
    }
  }
}
