import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/dtos/user/CreateUser.dto';
import { UsernameAndEmailDTO } from 'src/domain/dtos/user/UsernameAndEmail.dto';
import { UserEntity } from 'src/domain/entities/User.entity';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { DatabaseConnection } from 'src/infra/database/DatabaseConnection';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

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
