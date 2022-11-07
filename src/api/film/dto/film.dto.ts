import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Allow, IsNotEmpty, IsString } from 'class-validator';

import { Rating } from 'src/api/film/entities/film.entity';

export class CreateFilmDto {
  @ApiProperty({ not: null, example: 'Gozila' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Huge and dangerous monster' })
  @Allow()
  description: string;

  @ApiProperty({ example: '2001' })
  @Allow()
  releaseYear: Date;

  @ApiProperty({ example: 1 })
  @Allow()
  languageId: number;

  @ApiProperty({ example: null })
  @Allow()
  originalLanguageId: number;

  @ApiProperty({ example: 6 })
  @Allow()
  rentalDuration: number;

  @ApiProperty({ example: '0.99' })
  @Allow()
  rentalRate: number;

  @ApiProperty({ example: 86 })
  @Allow()
  length: number;

  @ApiProperty({ example: '20.99' })
  @Allow()
  replacementCost: number;

  @ApiProperty({ example: 'R', enum: Rating })
  @Allow()
  rating: Rating;

  @ApiProperty({
    example: ['Deleted Scenes', 'Behind the Scenes'],
    isArray: true,
  })
  @Allow()
  specialFeatures: string;
}

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiProperty({ not: null, example: 'Yet' })
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class CreateFilmSuccessfullyDto {
  @ApiProperty({ not: null, example: 'Gozila' })
  title: string;

  @ApiProperty({ example: 'Huge and dangerous monster' })
  description: string;

  @ApiProperty({ example: '2001' })
  releaseYear: Date;

  @ApiProperty({ example: 1 })
  languageId: number;

  @ApiProperty({ example: null })
  originalLanguageId: number;

  @ApiProperty({ example: 6 })
  rentalDuration: number;

  @ApiProperty({ example: '0.99' })
  rentalRate: number;

  @ApiProperty({ example: 86 })
  length: number;

  @ApiProperty({ example: '20.99' })
  replacementCost: number;

  @ApiProperty({ example: 'R' })
  rating: Rating;

  @ApiProperty({
    example: ['Deleted Scenes', 'Behind the Scenes'],
    isArray: true,
  })
  specialFeatures: string;

  @ApiProperty({ example: 1 })
  filmId: number;
}

export class UpdateFilmSuccessfullyDto {
  @ApiProperty({ example: 1 })
  filmId: number;

  @ApiProperty({ not: null, example: 'Gozila' })
  title: string;

  @ApiProperty({ example: 'Huge and dangerous monster' })
  description: string;

  @ApiProperty({ example: '2001' })
  releaseYear: Date;

  @ApiProperty({ example: 1 })
  languageId: number;

  @ApiProperty({ example: null })
  originalLanguageId: number;

  @ApiProperty({ example: 6 })
  rentalDuration: number;

  @ApiProperty({ example: '0.99' })
  rentalRate: number;

  @ApiProperty({ example: 86 })
  length: number;

  @ApiProperty({ example: '20.99' })
  replacementCost: number;

  @ApiProperty({ example: 'R' })
  rating: Rating;

  @ApiProperty({
    example: ['Deleted Scenes', 'Behind the Scenes'],
    isArray: true,
  })
  specialFeatures: string;

  @ApiProperty({ example: '2022-11-02T09:38:05.000Z' })
  lastUpdate: Date;
}

export class DeleteFilmSuccessfullyDto {
  @ApiProperty({ not: null, example: 'Gozila' })
  title: string;

  @ApiProperty({ example: 'Huge and dangerous monster' })
  description: string;

  @ApiProperty({ example: '2001' })
  releaseYear: Date;

  @ApiProperty({ example: 1 })
  languageId: number;

  @ApiProperty({ example: null })
  originalLanguageId: number;

  @ApiProperty({ example: 6 })
  rentalDuration: number;

  @ApiProperty({ example: '0.99' })
  rentalRate: number;

  @ApiProperty({ example: 86 })
  length: number;

  @ApiProperty({ example: '20.99' })
  replacementCost: number;

  @ApiProperty({ example: 'R' })
  rating: Rating;

  @ApiProperty({
    example: ['Deleted Scenes', 'Behind the Scenes'],
    isArray: true,
  })
  specialFeatures: string;

  @ApiProperty({ example: '2022-11-02T09:38:05.000Z' })
  lastUpdate: Date;
}

export class FilmNotFoundDto {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Film not found.' })
  message: string;

  @ApiProperty({ example: 'Fobbiden' })
  error: Date;
}
