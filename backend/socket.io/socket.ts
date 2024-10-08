import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private server: Server;

  public init(server: any) {
    this.server = new Server(server);
  }

  public getServer() {
    return this.server;
  }
  
  public emit(event: string, data: any) {
    this.server.emit(event, data);
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.server.on(event, callback);
  }
}
