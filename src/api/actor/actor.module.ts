import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';
import { Actor } from './entities/actor.entity';
import {LogService} from "../../log/log.service";
import {LogModule} from "../../log/log.module";
import {Log} from "../../log/entities/log.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Actor, Log]), LogModule],
  providers: [ActorService, LogService],
  controllers: [ActorController],
})
export class ActorModule {}
