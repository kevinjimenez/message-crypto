import { PaginationDto } from './../../common/dto/pagination.dto';
import { DatabaseService } from './../../database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly _databaseService: DatabaseService) {}

  public create(payload: CreateTaskDto) {
    return this._databaseService.task.create({
      data: payload,
    });
  }

  public async find(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;

      const totalPage = await this._databaseService.task.count();
      const lastPage = Math.ceil(totalPage / limit);
      const records = await this._databaseService.task.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        data: records,
        meta: { totalPage, page, lastPage },
      };
    } catch (error) {
      throw new NotFoundException('Tasks not found');
    }
  }

  public async findOneById(id: string) {
    const task = await this._databaseService.task.findFirst({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with [${id}] not found`);
    }

    return task;
  }

  public async updateOneById(id: string, updateTaskDto: UpdateTaskDto) {
    return this._databaseService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  public deleteOneById(id: string) {
    return this._databaseService.task.delete({
      where: { id },
    });
  }
}
