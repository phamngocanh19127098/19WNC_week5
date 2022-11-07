import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import {LoggingInterceptor} from "../interceptor/log.interceptor";
import {GetListDto} from "./dto/getListLog.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('log')
@ApiTags("log")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  async findAll(@Query() getListDto : GetListDto ) {
    return await this.logService.findAll(getListDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}
