import {CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LogService} from "../log/log.service";
import {CreateLogDto} from "../log/dto/create-log.dto";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logService: LogService) {

    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const response = http.getResponse();
        let {method, body, path, param, query} = request;
        let createLogDto : CreateLogDto = {
            method,
            body: JSON.stringify(request.body),
            path,
            param: JSON.stringify(request.param) || "",
            query: JSON.stringify(request.query) || "",
            requestAt : new Date(),
            headers: JSON.stringify(request.headers),
        }
        const now = Date.now();
        return next.handle().pipe(
            tap(async () => {
                createLogDto['timeRequest'] = Date.now() - now;
                createLogDto['statusCode'] = response.statusCode;
                createLogDto['message'] = response.statusMessage || "";
                await this.logService.create(createLogDto)
            }),
            catchError(async (err) => {
                const {message: error, status, stack} = err;
                createLogDto['timeRequest'] = Date.now() - now;
                createLogDto['statusCode'] = status;
                createLogDto['message'] = error;
                await this.logService.create(createLogDto)
                throw  new HttpException(err.message, status);
            })
        );
    }
}