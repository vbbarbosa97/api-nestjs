import { CreateUserDTO } from 'src/models/dtos/user/create-user.dto';
import { UserCreatedDTO } from 'src/models/dtos/user/user-created.dto';
import { UsernameAndEmailDTO } from 'src/models/dtos/user/username-email.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserCreatedDTO | null>;
  abstract findByUsername(username: string): Promise<UserCreatedDTO | null>;
  abstract findById(id: string): Promise<UserCreatedDTO | null>;
  abstract save(data: CreateUserDTO): Promise<UserCreatedDTO>;
}
