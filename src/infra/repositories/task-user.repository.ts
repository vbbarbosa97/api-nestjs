import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/create-task-user.dto';
import { TaskUserEntity } from 'src/domain/entities/task-user.entity';
import { ITaskUserRepository } from './interfaces/task-user.interface.repository';
import { DatabaseConnection } from '../database/database_connection';

export class TaskUserRepository implements ITaskUserRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

  //Vai criar a task e conectar o usuario a task através do repositorio de task_users
  public async save(data: CreateTaskUserDTO): Promise<TaskUserEntity> {
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
            id: data.userId,
          },
        },
      },
    });
  }
}
