import { TaskEntity } from './Task.entity';
import { UserEntity } from './User.entity';

export class TaskUserEntity {
  public taskId: string;
  public userId: string;
  public id: string;
  public user?: Partial<UserEntity>;
  public task?: Partial<TaskEntity>;
}
