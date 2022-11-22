import {Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {CreateLogDto} from './dto/create-log.dto';
import {UpdateLogDto} from './dto/update-log.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Log} from "./entities/log.entity";
import {Brackets, LessThan, Repository} from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import {GetListDto} from "./dto/getListLog.dto";

@Injectable()
export class LogService {

    constructor(
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,

    ) {
    }
    private readonly logger = new Logger(LogService.name);

    async create(createLogDto: CreateLogDto) {
        return await this.logRepository.save(createLogDto);
    }

    async findAll(getListDto: GetListDto) {
        const { fullTextSearch} = getListDto;
        const query = this.logRepository.createQueryBuilder('log')
        if ( fullTextSearch != null && fullTextSearch != '') {
            query.andWhere(
                new Brackets((sqb) => {
                    sqb.orWhere(
                        'LOWER(log.body) LIKE LOWER (:body)',
                        {
                            body: `%${fullTextSearch}%`,
                        },
                    );
                    sqb.orWhere('LOWER(log.headers) LIKE LOWER (:headers)', {
                        headers: `%${fullTextSearch}%`,
                    });

                    sqb.orWhere('LOWER(log.method) LIKE LOWER (:method)', {
                        method: `%${fullTextSearch}%`,
                    });

                    sqb.orWhere('LOWER(log.requestAt) LIKE LOWER (:requestAt)', {
                        requestAt: `%${fullTextSearch}%`,
                    });
                }),
            );
        }
        let data = await query.getMany();
        return {
            statusCode: 200,
            data,
        };
    }

    findOne(id: number) {
        return `This action returns a #${id} log`;
    }

    update(id: number, updateLogDto: UpdateLogDto) {
        return `This action updates a #${id} log`;
    }

    remove(id: number) {
        return `This action removes a #${id} log`;
    }

    // @Cron(CronExpression.EVERY_30_SECONDS, { timeZone : 'Asia/Ho_Chi_Minh'})
    async removeCronJobs(){
        let today = new Date();
        let previousYear = new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate(),
        );
        this.logger.debug('Called when the current second is 30');
        await this.logRepository.delete({
            requestAt: LessThan(previousYear)
        })

    }
}

