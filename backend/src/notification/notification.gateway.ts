import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { CreateNotificationDto } from './dto/create-notification.dto';
  
  @WebSocketGateway({ cors: true })
  export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    afterInit(server: Server) {
      console.log('WebSocket initialized');
    }
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    sendNotification(userId: string, notification: CreateNotificationDto) {
      this.server.to(userId).emit('notification', notification);
    }
  
    @SubscribeMessage('sendNotification')
    handleSendNotification(client: Socket, data: CreateNotificationDto) {
      this.sendNotification(data.userId, data);
    }
  }
  