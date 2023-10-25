import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dto/sign-in.dto';
import { IUserRepository } from 'src/infra/repositories/interfaces/user.interface.repository';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class SignInUseCase {
  constructor(
    private useRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  public async execute(data: SignInDTO) {
    try {
      const user = await this.useRepository.findByUsername(data.username);

      if (!user) {
        throw new UnauthorizedException();
      }

      const passwordCorrect = await compare(data.password, user.password);

      if (!passwordCorrect) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: user.id,
        username: user.username,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}