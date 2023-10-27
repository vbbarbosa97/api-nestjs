import { Module } from '@nestjs/common';
import { ITaskUserRepository } from 'src/domain/repositories/ITaskUser.repository';
import { TaskUserRepository } from 'src/infra/repositories/TaskUser.repository';
import { TaskUserController } from './TaskUser.controller';
import { CreateTaskUserUseCase } from './useCases/CreateTaskUser.usecase';

@Module({
  imports: [],
  controllers: [TaskUserController],
  providers: [
    {
      provide: ITaskUserRepository,
      useClass: TaskUserRepository,
    },
    CreateTaskUserUseCase,
  ],
})
export class TaskUserModule {}
