import { Injectable } from '@nestjs/common';
import { Actor } from 'src/actors/entities/actor.entity';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ActorsService {

  
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository : Repository<Actor>){

    }
  async create(createActorDto: CreateActorDto) {
    return await this.actorRepository.save(createActorDto);
  }

  async findAll() {
    return await this.actorRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} actor`;
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  remove(id: number) {
    return `This action removes a #${id} actor`;
  }
}
