import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from './useCases/sign-in.usecase';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/login')
  public async login(@Body() data: SignInDTO) {
    return await this.signInUseCase.execute(data);
  }
}
