import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskUserDTO } from 'src/domain/dtos/taskUser/create-task-user.dto';
import { ITaskUserRepository } from 'src/infra/repositories/interfaces/task-user.interface.repository';

@Injectable()
export class CreateTaskUserUseCase {
  constructor(private taskUserRepository: ITaskUserRepository) {}

  public async execute(data: CreateTaskUserDTO, userId: string) {
    try {
      const taskUser = await this.taskUserRepository.save(data, userId);
      return taskUser;
    } catch (error: any) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
