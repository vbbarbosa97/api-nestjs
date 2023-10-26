import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/create-task-user.dto';
import { TaskUserEntity } from 'src/domain/entities/task-user.entity';

export abstract class ITaskUserRepository {
  abstract save(data: CreateTaskUserDTO, userId: string): Promise<TaskUserEntity>;
}
