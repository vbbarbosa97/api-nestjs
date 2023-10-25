import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/infra/repositories/interfaces/user.interface.repository';
import { UserPrismaRepository } from 'src/infra/repositories/user.repository';
import { AuthController } from './auth.controller';
import { SignInUseCase } from './useCases/sign-in.usecase';
import { DatabaseConnection } from 'src/infra/database/database_connection';
import { JwtModule } from '@nestjs/jwt';

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
      useClass: UserPrismaRepository,
    },
  ],
})
export class AuthModule {}
