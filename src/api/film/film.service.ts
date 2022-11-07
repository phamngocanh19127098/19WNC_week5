import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreateFilmDto, UpdateFilmDto } from './dto/film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  create(dto: CreateFilmDto): Promise<Film> {
    return this.filmRepository.save(dto);
  }

  getAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  get(id: number): Promise<Film> {
    return this.filmRepository.findOneBy({ filmId: id });
  }

  update(id: number, dto: UpdateFilmDto): Promise<UpdateResult> {
    return this.filmRepository.update({ filmId: id }, dto);
  }

  async remove(id: number): Promise<Film> {
    return this.filmRepository.remove(
      await this.filmRepository.findOneBy({ filmId: id }),
    );
  }
}
