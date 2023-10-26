import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from 'src/domain/dtos/auth/SignIn.dto';
import { SignInUseCase } from './useCases/SignIn.usecase';

@Controller('/auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/login')
  public async login(@Body() data: SignInDTO) {
    return await this.signInUseCase.execute(data);
  }
}
