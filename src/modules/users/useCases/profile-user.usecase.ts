import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/infra/repositories/interfaces/user.interface.repository';

@Injectable()
export class ProfileUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundException();
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
