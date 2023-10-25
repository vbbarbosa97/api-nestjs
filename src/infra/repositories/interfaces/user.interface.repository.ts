import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UserCreatedDTO } from 'src/modules/users/dto/user-created.dto';
import { UsernameAndEmailDTO } from 'src/modules/users/dto/username-email.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserCreatedDTO | null>;
  abstract findByUsername(username: string): Promise<UserCreatedDTO | null>;
  abstract findById(id: string): Promise<UserCreatedDTO | null>;
  abstract save(data: CreateUserDTO): Promise<UserCreatedDTO>;
}
