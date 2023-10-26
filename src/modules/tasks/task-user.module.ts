import { Module } from '@nestjs/common';
import { DatabaseConnection } from 'src/infra/database/database_connection';
import { ITaskUserRepository } from 'src/infra/repositories/interfaces/task-user.interface.repository';
import { TaskUserRepository } from 'src/infra/repositories/task-user.repository';
import { TaskUserController } from './task-user.controller';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';

@Module({
  imports: [],
  controllers: [TaskUserController],
  providers: [
    DatabaseConnection,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserRepository,
    },
    CreateTaskUserUseCase,
  ],
})
export class TaskUserModule {}
