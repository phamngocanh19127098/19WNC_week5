import { TypeOrmModule } from '@nestjs/typeorm';
import {MiddlewareConsumer, Module} from '@nestjs/common';

import { ActorModule } from 'src/api/actor/actor.module';
import { Actor } from 'src/api/actor/entities/actor.entity';
import { FilmModule } from 'src/api/film/film.module';
import { Film } from 'src/api/film/entities/film.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import {Log} from "./log/entities/log.entity";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sakila',
      entities: [Actor, Film, Log],
      synchronize: false,
    }),
    ScheduleModule.forRoot(),
    ActorModule,
    FilmModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
