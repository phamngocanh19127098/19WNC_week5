import {Controller, Get, UseInterceptors} from '@nestjs/common';

import { AppService } from './app.service';
import {LoggingInterceptor} from "./interceptor/log.interceptor";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
