import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IUserRepository } from 'src/domain/repositories/IUser.repository';
import { UserRepository } from 'src/infra/repositories/User.repository';
import { AuthController } from './Auth.controller';
import { SignInUseCase } from './useCases/SignIn.usecase';

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
    SignInUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
