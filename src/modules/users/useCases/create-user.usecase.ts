import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { IUserRepository } from '../../../infra/repositories/interfaces/user.interface.repository';
import { CreateUserDTO, CreateUserResponseDTO } from '../../../models/dtos/user/create-user.dto';

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

      //Faz o mapper automaticamente
      const userDto = CreateUserResponseDTO.safeParse(userCreated);

      return userDto;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
