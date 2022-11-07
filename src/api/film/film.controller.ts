import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateFilmDto,
  CreateFilmSuccessfullyDto,
  DeleteFilmSuccessfullyDto,
  FilmNotFoundDto,
  UpdateFilmDto,
  UpdateFilmSuccessfullyDto,
} from './dto/film.dto';
import { FilmService } from './film.service';
import { Film } from './entities/film.entity';

@ApiTags('films')
@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateFilmSuccessfullyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiOperation({ summary: 'Create film' })
  @Post()
  create(@Body() dto: CreateFilmDto): Promise<Film> {
    return this.filmService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
    type: [UpdateFilmSuccessfullyDto],
  })
  @ApiOperation({ summary: 'Get all films' })
  @Get()
  getAll(): Promise<Film[]> {
    return this.filmService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: UpdateFilmSuccessfullyDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Film not found.',
    type: FilmNotFoundDto,
  })
  @ApiOperation({ summary: 'Get film by ID' })
  @Get(':id')
  async get(@Param('id') filmId: number): Promise<Film> {
    const film = await this.filmService.get(filmId);

    if (!film) {
      throw new ForbiddenException('Film not found');
    }

    return film;
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UpdateFilmSuccessfullyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 403,
    description: 'Film not found.',
    type: FilmNotFoundDto,
  })
  @ApiOperation({ summary: 'Update film by ID' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateFilmDto,
  ): Promise<Film> {
    const film = await this.filmService.get(id);

    if (!film) {
      throw new ForbiddenException('Film not found.');
    }

    await this.filmService.update(id, dto);

    return this.filmService.get(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: DeleteFilmSuccessfullyDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Film not found.',
    type: FilmNotFoundDto,
  })
  @ApiOperation({ summary: 'Delete film by ID' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Film> {
    const film = await this.filmService.get(id);

    if (!film) {
      throw new ForbiddenException('Film not found.');
    }

    return this.filmService.remove(id);
  }
}
