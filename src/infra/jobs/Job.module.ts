import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ITaskUserRepository } from 'src/domain/repositories/ITaskUser.repository';
import { TaskUserRepository } from '../repositories/TaskUser.repository';
import { NotificationTaskUserJob } from './NotificationTaskUser.job';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: { port: 3001, host: '127.0.0.1' },
      },
    ]),
  ],
  controllers: [],
  providers: [
    NotificationTaskUserJob,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserRepository,
    },
  ],
})
export class JobModule {}
