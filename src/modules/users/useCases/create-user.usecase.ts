import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO } from '../dto/user.dto';
import { IUserRepository } from '../../../infra/repositories/interfaces/user.interface.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: CreateUserDTO) {
    try {
      const userExist = await this.userRepository.findByUsernameOrEmail({
        email: data.email,
        username: data.username,
      });

      if (userExist) {
        throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
      }

      const password = await hash(data.password, 10);

      const userCreated = await this.userRepository.save({
        ...data,
        password,
      });

      return userCreated;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
