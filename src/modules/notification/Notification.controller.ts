import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/notification')
export class NotificationController {
  constructor(@Inject('NOTIFICATION') private readonly notificationClient: ClientProxy) {}

  @Get('/send-notification')
  public testeNotification() {
    this.notificationClient.emit('task_notification', 'tesd');
  }
}
