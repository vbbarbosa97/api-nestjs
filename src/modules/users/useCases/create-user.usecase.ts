import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseConnection } from 'src/infra/database/database_connection';
import { CreateUserDTO } from '../dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private databaseConnection: DatabaseConnection) {}

  public async execute(data: CreateUserDTO) {
    try {
      const userExist = await this.databaseConnection.user.findFirst({
        where: {
          OR: [{ username: data.username }, { email: data.email }],
        },
      });

      if (userExist) {
        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
      }

      const passwordHased = await hash(data.password, 10);

      return await this.databaseConnection.user.create({
        data: {
          ...data,
          password: passwordHased,
        },
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
