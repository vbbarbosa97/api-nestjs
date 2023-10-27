import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/CreateTaskUser.dto';
import { TaskUserEntity } from 'src/domain/entities/TaskUser.entity';
import { ITaskUserRepository } from '../../domain/repositories/ITaskUser.repository';
import { DatabaseConnectionService } from '../database/DatabaseConnection.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskUserRepository implements ITaskUserRepository {
  constructor(private databaseConnection: DatabaseConnectionService) {}

  //Vai criar a task e conectar o usuario a task através do repositorio de task_users
  public async save(data: CreateTaskUserDTO, userId: string): Promise<TaskUserEntity> {
    return await this.databaseConnection.taskUser.create({
      data: {
        task: {
          create: {
            description: data.description,
            endAt: data.endAt,
            priority: data.priority,
            startAt: data.startAt,
            status: data.status,
            title: data.title,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async findAllStartDay(): Promise<TaskUserEntity[]> {
    const startDay = new Date();
    startDay.setUTCHours(0, 0, 0, 0);

    const endDay = new Date();
    endDay.setUTCHours(23, 59, 59, 999);

    return await this.databaseConnection.taskUser.findMany({
      where: {
        AND: [
          {
            task: {
              startAt: {
                gte: startDay,
                lte: endDay,
              },
            },
          },
        ],
      },
      include: {
        task: true,
        user: true,
      },
    });
  }
}
