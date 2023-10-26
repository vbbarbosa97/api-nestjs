import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/CreateTaskUser.dto';
import { TaskUserEntity } from 'src/domain/entities/TaskUser.entity';

export abstract class ITaskUserRepository {
  abstract save(data: CreateTaskUserDTO, userId: string): Promise<TaskUserEntity>;
}
