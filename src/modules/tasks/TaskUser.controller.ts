import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateTaskUserUseCase } from './useCases/CreateTaskUser.usecase';
import { AuthGuardProvider } from 'src/providers/AuthGuard.provider';
import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/CreateTaskUser.dto';

@Controller('/tasks')
export class TaskUserController {
  constructor(private createTaskUserUseCase: CreateTaskUserUseCase) {}

  @Post()
  @UseGuards(AuthGuardProvider)
  public async create(@Body() data: CreateTaskUserDTO, @Request() request) {
    return await this.createTaskUserUseCase.execute(data, request.user.sub);
  }
}
