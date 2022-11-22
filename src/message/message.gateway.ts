import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'http';
import { Socket } from 'dgram';
import { ActorService } from 'src/api/actor/actor.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  @WebSocketServer()
  server : Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    console.log('hello');
    
    const message = await this.messageService.create(createMessageDto);

    this.server.emit('createMessage', [
      {
        "actorId": 1,
        "firstName": "PENELOPE",
        "lastName": "Thien",
        "lastUpdate": "2022-11-07T08:15:14.000Z"
    }
    ]);
    console.log('hello');
    
    return this.messageService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessage')
  findAll() {
    return this.messageService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messageService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messageService.remove(id);
  }
  @SubscribeMessage('join')
  connectServer(
    @MessageBody('name') name : string,
    @ConnectedSocket() client: Socket)
  {
    return null
  }
}
