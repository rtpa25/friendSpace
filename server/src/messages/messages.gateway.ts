import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
@UseGuards(AuthGuard)
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.on('private message', (anotherSocketId, msg) => {
      client.to(anotherSocketId).emit('private message', client.id, msg);
    });
    return this.messagesService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messagesService.findAll(
      createMessageDto.sender,
      createMessageDto.reciver,
    );
  }
}
