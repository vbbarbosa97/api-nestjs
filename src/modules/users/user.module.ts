import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { UserController } from './user.controller';
import { DatabaseConnection } from 'src/infra/database/database_connection';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase, DatabaseConnection],
})
export class UserModule {}
