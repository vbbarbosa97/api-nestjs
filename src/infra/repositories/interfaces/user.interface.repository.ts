import { CreateUserDTO } from 'src/domain/dtos/user/create-user.dto';
import { UsernameAndEmailDTO } from 'src/domain/dtos/user/username-email.dto';
import { UserEntity } from 'src/domain/entities/user.entity';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract save(data: CreateUserDTO): Promise<UserEntity>;
}
