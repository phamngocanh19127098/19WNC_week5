import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Actor } from 'src/actors/entities/actor.entity';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ActorsGateway {
  @WebSocketServer()
  server : Server;

  constructor(private readonly actorsService: ActorsService) {}

  @SubscribeMessage('createActor')
  async create(@MessageBody() createActorDto: CreateActorDto) {
    let createdEntity  =  await this.actorsService.create(createActorDto);
    console.log('created user');
    this.server.emit('createdActor', {});
    return createdEntity;
  }

  @SubscribeMessage('findAllActors')
  async findAll() {
    let actors : Actor[]  = await this.actorsService.findAll();
    this.server.emit('findAllActors',actors);
    return actors;
  }

  @SubscribeMessage('findOneActor')
  findOne(@MessageBody() id: number) {
    return this.actorsService.findOne(id);
  }

  @SubscribeMessage('updateActor')
  update(@MessageBody() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(updateActorDto.id, updateActorDto);
  }

  @SubscribeMessage('removeActor')
  remove(@MessageBody() id: number) {
    return this.actorsService.remove(id);
  }
}
