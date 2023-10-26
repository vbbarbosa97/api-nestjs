import { CreateUserDTO } from '../dtos/user/CreateUser.dto';
import { UsernameAndEmailDTO } from '../dtos/user/UsernameAndEmail.dto';
import { UserEntity } from '../entities/User.entity';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract save(data: CreateUserDTO): Promise<UserEntity>;
  abstract updateAvatarUrl(id: string, avatarUrl: string): Promise<void>;
}
