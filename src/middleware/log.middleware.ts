import {Logger, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {LogService} from "../log/log.service";

export class LogMiddleware implements NestMiddleware {
    constructor(private readonly logService : LogService) {

    }

    private readonly logger = new Logger('HTTP')
    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        next();
    }
}