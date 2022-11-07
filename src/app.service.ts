import {Injectable, UseInterceptors} from '@nestjs/common';
import {LoggingInterceptor} from "./interceptor/log.interceptor";

@Injectable()
export class AppService {
  @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return 'Hello World!';
  }
}
