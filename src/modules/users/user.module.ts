import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/CreateUser.usecase';
import { DatabaseConnection } from 'src/infra/database/DatabaseConnection';
import { ProfileUserUseCase } from './useCases/ProfileUser.usecase';
import { UserRepository } from 'src/infra/repositories/User.repository';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { UserController } from './User.controller';
import { UploadAvatarUserUseCase } from './useCases/UploadAvatarUser.usecase';
import { SupabaseStorage } from 'src/clients/SupabaseStorage.client';
import { IStorage } from 'src/domain/storage/IStorage';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    DatabaseConnection,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
    CreateUserUseCase,
    ProfileUserUseCase,
    UploadAvatarUserUseCase,
  ],
})
export class UserModule {}
