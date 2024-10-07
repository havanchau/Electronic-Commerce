import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(notification: Notification) {
    const createdNotification = await this.notificationRepository.save(notification);
    return createdNotification;
  }

  async getNotifications(userId: string) {
    return this.notificationRepository.find({ where: { userId } });
  }
}
