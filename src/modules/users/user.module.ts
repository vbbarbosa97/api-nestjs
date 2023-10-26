import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/CreateUser.usecase';
import { DatabaseConnection } from 'src/infra/database/DatabaseConnection';
import { ProfileUserUseCase } from './useCases/ProfileUser.usecase';
import { UserRepository } from 'src/infra/repositories/User.repository';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { UserController } from './User.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    DatabaseConnection,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    CreateUserUseCase,
    ProfileUserUseCase,
  ],
})
export class UserModule {}
