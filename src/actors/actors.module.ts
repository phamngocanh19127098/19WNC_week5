import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsGateway } from './actors.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/actors/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorsGateway, ActorsService],
})
export class ActorsModule {}
