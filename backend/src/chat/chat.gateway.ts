import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  @SubscribeMessage('register')
  handleRegister(@ConnectedSocket() socket: Socket, @MessageBody() userId: string): void {
    this.users.set(userId, socket.id);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { senderId: string; recipientId: string; message: string }
  ): void {
    const recipientSocketId = this.users.get(data.recipientId);
    this.chatService.saveMessage(data.senderId, data.recipientId, data.message);

    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('message', {
        senderId: data.senderId,
        message: data.message,
      });
    }
  }
}
