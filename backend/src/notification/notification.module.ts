import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationsController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.schema';
import { NotificationsGateway } from './notification.gateway'
import { SocketService } from '../../socket.io/socket';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [NotificationService, NotificationsGateway, SocketService],
  exports: [NotificationsGateway],
})
export class NotificationModule {}
