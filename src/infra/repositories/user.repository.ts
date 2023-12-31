import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/dtos/user/CreateUser.dto';
import { UsernameAndEmailDTO } from 'src/domain/dtos/user/UsernameAndEmail.dto';
import { UserEntity } from 'src/domain/entities/User.entity';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { DatabaseConnectionService } from 'src/infra/database/DatabaseConnection.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private databaseConnection: DatabaseConnectionService) {}

  public async updateAvatarUrl(id: string, avatarUrl: string): Promise<void> {
    await this.databaseConnection.user.update({
      where: { id },
      data: { avatarUrl },
    });
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return await this.databaseConnection.user.findUnique({
      where: { id },
    });
  }

  public async findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserEntity | null> {
    return await this.databaseConnection.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.databaseConnection.user.findUnique({
      where: {
        username,
      },
    });
  }

  public async save(data: CreateUserDTO): Promise<UserEntity> {
    return await this.databaseConnection.user.create({ data });
  }
}
