import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuardProvider } from 'src/providers/AuthGuard.provider';
import { CreateUserUseCase } from './useCases/CreateUser.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from 'src/domain/dtos/File.dto';
import { ProfileUserUseCase } from './useCases/ProfileUser.usecase';
import { CreateUserDTO } from 'src/domain/dtos/user/CreateUser.dto';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  public async create(@Body() data: CreateUserDTO) {
    return await this.createUserUseCase.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuardProvider)
  public async profile(@Request() request) {
    return await this.profileUserUseCase.execute(request.user.sub);
  }

  @Post('/avatar')
  @UseGuards(AuthGuardProvider)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatar(@UploadedFile() file: FileDTO) {
    console.log(file);
  }
}
