import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film } from './entities/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmService],
  controllers: [FilmController],
})
export class FilmModule {}
