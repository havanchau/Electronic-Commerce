import { Controller, Post, Body } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsGateway } from './notification.gateway';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Notification sent successfully.' })
  sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    this.notificationsGateway.sendNotification(createNotificationDto.userId, createNotificationDto);
    return { message: 'Notification sent successfully.' };
  }
}
