import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';

@Injectable()
export class ProfileUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string) {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundException();
      }

      user.password = '';

      return user;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
