import { CreateUserDTO, UserCreatedDTO, UsernameAndEmailDTO } from '../../../modules/users/dto/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserCreatedDTO | null>;
  abstract findByUsername(username: string): Promise<UserCreatedDTO | null>;
  abstract save(data: CreateUserDTO): Promise<UserCreatedDTO>;
}
