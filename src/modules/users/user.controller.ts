import { Body, Controller, Get, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuardProvider } from 'src/providers/AuthGuard.provider';
import { CreateUserUseCase } from './useCases/CreateUser.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from 'src/domain/dtos/File.dto';
import { ProfileUserUseCase } from './useCases/ProfileUser.usecase';
import { CreateUserDTO } from 'src/domain/dtos/user/CreateUser.dto';
import { UploadAvatarUserUseCase } from './useCases/UploadAvatarUser.usecase';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
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

  @Put('/avatar')
  @UseGuards(AuthGuardProvider)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatar(@UploadedFile() file: FileDTO, @Request() request) {
    return await this.uploadAvatarUserUseCase.execute(file, request.user.sub);
  }
}
