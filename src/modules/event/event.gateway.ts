import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(EventGateway.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.logger.log('Websocket server initialized.');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('createOffer')
  handleCreateOfferEvent(client: Socket, payload: string): void {
    this.server.emit('createOffer', payload);
  }

  @SubscribeMessage('updateOffer')
  handleUpdateOfferEvent(client: Socket, payload: string): void {
    this.server.emit('updateOffer', payload);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessageEvent(client: Socket, payload: string): void {
    this.server.emit('createMessage', payload);
  }

  @SubscribeMessage('directMessage')
  handleDirectMessageEvent(client: Socket, payload: string): void {
    this.server.emit('directMessage', payload);
  }
}
