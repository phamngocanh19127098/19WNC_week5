import { ApiProperty } from '@nestjs/swagger';
import {IsString} from "class-validator";

export class GetListDto {

    @ApiProperty({
        name: 'fullTextSearch',
        required: false
    })
    @IsString()
    fullTextSearch : string;
}
