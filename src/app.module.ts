import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/TaskUser.module';
import { AuthModule } from './modules/auth/Auth.module';
import { UserModule } from './modules/users/User.module';
import { JobModule } from './infra/jobs/Job.module';
import { DatabaseConnectionModule } from './infra/database/DatabaseConnection.module';

@Module({
  imports: [DatabaseConnectionModule, UserModule, AuthModule, TaskUserModule, JobModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
