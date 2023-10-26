import { Module } from '@nestjs/common';
import { DatabaseConnection } from 'src/infra/database/DatabaseConnection';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './Auth.controller';
import { SignInUseCase } from './useCases/SignIn.usecase';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { UserRepository } from 'src/infra/repositories/User.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'NEST_SECRET',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    DatabaseConnection,
    SignInUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
