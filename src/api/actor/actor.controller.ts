import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put, UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ActorNotFoundDto,
  CreateActorDto,
  CreateActorSuccessfullyDto,
  DeleteActorSuccessfullyDto,
  UpdateActorDto,
  UpdateActorSuccessfullyDto,
} from './dto/actor.dto';
import { ActorService } from './actor.service';
import { Actor } from './entities/actor.entity';
import {LoggingInterceptor} from "../../interceptor/log.interceptor";

@ApiTags('actors')
@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateActorSuccessfullyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiOperation({ summary: 'Create actor' })
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
    type: [UpdateActorSuccessfullyDto],
  })
  @ApiOperation({ summary: 'Get all actors' })
  @Get()
  getAll(): Promise<Actor[]> {
    return this.actorService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
    type: UpdateActorSuccessfullyDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Actor not found.',
    type: ActorNotFoundDto,
  })
  @ApiOperation({ summary: 'Get actor by ID' })
  @Get(':id')
  async get(@Param('id') actorId: number): Promise<Actor> {
    const actor = await this.actorService.get(actorId);

    if (!actor) {
      throw new ForbiddenException('Actor not found');
    }

    return actor;
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UpdateActorSuccessfullyDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 403,
    description: 'Actor not found.',
    type: ActorNotFoundDto,
  })
  @ApiOperation({ summary: 'Update actor by ID' })
  @Put(':id')
  @UseInterceptors(LoggingInterceptor)
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateActorDto,
  ): Promise<Actor> {
    const actor = await this.actorService.get(id);

    if (!actor) {
      throw new ForbiddenException('Actor not found.');
    }

    await this.actorService.update(id, dto);

    return this.actorService.get(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: DeleteActorSuccessfullyDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Actor not found.',
    type: ActorNotFoundDto,
  })
  @ApiOperation({ summary: 'Delete actor by ID' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Actor> {
    const actor = await this.actorService.get(id);

    if (!actor) {
      throw new ForbiddenException('Actor not found.');
    }

    return this.actorService.remove(id);
  }
}
