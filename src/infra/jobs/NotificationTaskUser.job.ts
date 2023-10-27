import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageNotificationDTO } from 'src/domain/dtos/notification/MessegaNotification.dto';
import { ITaskUserRepository } from 'src/domain/repositories/ITaskUser.repository';

@Injectable()
export class NotificationTaskUserJob {
  constructor(
    private taskUserRepository: ITaskUserRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async getAllTaskDay() {
    const allTasks = await this.taskUserRepository.findAllStartDay();

    console.log('=== NOTIFICANDO ===');

    if (allTasks.length !== 0) {
      allTasks.forEach((item) => {
        const data: MessageNotificationDTO = {
          description: item.task!.description!,
          email: item.user!.email!,
          endAt: item.task!.endAt!,
          name: item.user!.name!,
          startAt: item.task!.startAt!,
          title: item.task!.title!,
        };

        this.notificationClient.emit('task_notification', data);
      });
    }

    console.log('=== ENVIADO ===');
  }
}
