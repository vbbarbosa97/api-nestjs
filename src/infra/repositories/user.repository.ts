import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/dtos/user/create-user.dto';
import { UsernameAndEmailDTO } from 'src/domain/dtos/user/username-email.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import { DatabaseConnection } from 'src/infra/database/database_connection';
import { IUserRepository } from './interfaces/user.interface.repository';

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
