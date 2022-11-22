import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({ not: null, example: 'Quoc' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ not: null, example: 'Bao' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class UpdateActorDto extends PartialType(CreateActorDto) {
  @ApiProperty({ not: null, example: 'Thien' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class CreateActorSuccessfullyDto {
  @ApiProperty({ example: 'Quoc' })
  firstName: string;

  @ApiProperty({ example: 'Bao' })
  lastName: string;

  @ApiProperty({ example: 1 })
  actorId: number;
}

export class UpdateActorSuccessfullyDto {
  @ApiProperty({ example: 'Quoc' })
  firstName: string;

  @ApiProperty({ example: 'Thien' })
  lastName: string;

  @ApiProperty({ example: 1 })
  actorId: number;

  @ApiProperty({ example: '2022-11-02T09:38:05.000Z' })
  lastUpdate: Date;
}

export class DeleteActorSuccessfullyDto {
  @ApiProperty({ example: 'Quoc' })
  firstName: string;

  @ApiProperty({ example: 'Thien' })
  lastName: string;

  @ApiProperty({ example: '2022-11-02T09:38:05.000Z' })
  lastUpdate: Date;
}

export class ActorNotFoundDto {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Actor not found.' })
  message: string;

  @ApiProperty({ example: 'Fobbiden' })
  error: Date;
}
