import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { ActorService } from 'src/api/actor/actor.service';

@Module({
  providers: [MessageGateway, MessageService]
})
export class MessageModule {}
