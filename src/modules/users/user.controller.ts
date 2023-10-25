import { Body, Controller, Get, Post, UseGuards, UsePipes, Request } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { CreateUserDTO } from './dto/user.dto';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';
import { AuthGuard } from 'src/providers/auth-guard.provider';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  public async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  public async profile(@Request() request) {
    return this.profileUserUseCase.execute(request.user.sub);
  }
}
