import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateTaskUserUseCase } from './useCases/create-task-user.usecase';
import { AuthGuard } from 'src/providers/auth-guard.provider';
import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/create-task-user.dto';

@Controller('/tasks')
export class TaskUserController {
  constructor(private createTaskUserUseCase: CreateTaskUserUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(@Body() data: CreateTaskUserDTO, @Request() request) {
    return await this.createTaskUserUseCase.execute(data, request.user.sub);
  }
}
