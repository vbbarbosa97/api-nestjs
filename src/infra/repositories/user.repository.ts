import { DatabaseConnection } from 'src/infra/database/database_connection';
import { UsernameAndEmailDTO, UserCreatedDTO, CreateUserDTO } from '../../modules/users/dto/user.dto';
import { IUserRepository } from './interfaces/user.interface.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private databaseConnection: DatabaseConnection) {}

  public async findById(id: string): Promise<UserCreatedDTO> {
    return await this.databaseConnection.user.findUnique({
      where: { id },
    });
  }

  public async findByUsernameOrEmail(data: UsernameAndEmailDTO): Promise<UserCreatedDTO> {
    return await this.databaseConnection.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  public async findByUsername(username: string): Promise<UserCreatedDTO> {
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
