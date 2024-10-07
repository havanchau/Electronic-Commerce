import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async saveMessage(senderId: string, recipientId: string, message: string) {
    const newMessage = this.messageRepository.create({
      senderId,
      recipientId,
      message,
    });
    return this.messageRepository.save(newMessage);
  }

  async getMessages(userId: string) {
    return this.messageRepository.find({
      where: [
        { senderId: userId },
        { recipientId: userId },
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
