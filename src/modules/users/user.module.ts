import { Module } from '@nestjs/common';
import { SupabaseStorage } from 'src/clients/SupabaseStorage.client';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { IStorage } from 'src/domain/storage/IStorage';
import { UserRepository } from 'src/infra/repositories/User.repository';
import { UserController } from './User.controller';
import { CreateUserUseCase } from './useCases/CreateUser.usecase';
import { ProfileUserUseCase } from './useCases/ProfileUser.usecase';
import { UploadAvatarUserUseCase } from './useCases/UploadAvatarUser.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
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
