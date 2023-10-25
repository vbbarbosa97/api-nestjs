import { DatabaseConnection } from 'src/infra/database/database_connection';
import { IUserRepository } from './interfaces/user.interface.repository';
import { Injectable } from '@nestjs/common';
import { UserCreatedDTO } from 'src/modules/users/dto/user-created.dto';
import { UsernameAndEmailDTO } from 'src/modules/users/dto/username-email.dto';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

  public async findById(id: string): Promise<UserCreatedDTO | null> {
    return await this.databaseConnection.user.findUnique({
      where: { id },
    });
  }

  public async findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserCreatedDTO | null> {
    return await this.databaseConnection.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  public async findByUsername(username: string): Promise<UserCreatedDTO | null> {
    return await this.databaseConnection.user.findUnique({
      where: {
        username,
      },
    });
  }

  public async save(data: CreateUserDTO): Promise<UserCreatedDTO> {
    return await this.databaseConnection.user.create({ data });
  }
}
