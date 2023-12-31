import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDTO, CreateUserResponseDTO } from 'src/domain/dtos/user/CreateUser.dto';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(private userRepository: IUserRepository) {}

  public async execute(data: CreateUserDTO) {
    try {
      const userExist = await this.userRepository.findByUsernameOrEmail({
        email: data.email,
        username: data.username,
      });

      if (userExist) {
        this.logger.error(`User ${data.username} already exists...`);
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
