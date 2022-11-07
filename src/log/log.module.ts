import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Log} from "./entities/log.entity";

@Module({
  controllers: [LogController],
  providers: [LogService],
  imports:[
      TypeOrmModule.forFeature([Log])
  ],
  exports: [LogService],
})
export class LogModule {}
