import { TypeOrmModule } from '@nestjs/typeorm';
import {MiddlewareConsumer, Module} from '@nestjs/common';

import { ActorModule } from 'src/api/actor/actor.module';
// import { Actor } from 'src/api/actor/entities/actor.entity';
import { FilmModule } from 'src/api/film/film.module';
import { Film } from 'src/api/film/entities/film.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import {Log} from "./log/entities/log.entity";
import {ScheduleModule} from "@nestjs/schedule";
import { AuthModule } from 'src/api/auth/auth.module';
import { User } from 'src/api/users/entities/user.entity';
import { MessageModule } from './message/message.module';
import { ActorsModule } from './actors/actors.module';
import { Actor } from 'src/actors/entities/actor.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sakila',
      entities: [Actor, Film, Log, User],
      synchronize: false,
    }),
    ScheduleModule.forRoot(),
    ActorModule,
    FilmModule,
    LogModule,
    AuthModule,
    MessageModule,
    ActorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
