import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { UserController } from './user.controller';
import { IUserRepository } from 'src/infra/repositories/interfaces/user.interface.repository';
import { UserPrismaRepository } from 'src/infra/repositories/user.repository';
import { DatabaseConnection } from 'src/infra/database/database_connection';
import { ProfileUserUseCase } from './useCases/profile-user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    DatabaseConnection,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    CreateUserUseCase,
    ProfileUserUseCase,
  ],
})
export class UserModule {}
