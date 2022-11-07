import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name : 'headers'})
    headers: string;

    @Column({name : 'param'})
    param: string;

    @Column({name : 'query'})
    query: string;

    @Column({name : 'method'})
    method: string;

    @Column({ name : 'path'})
    path: string;

    @Column({ name : 'body'})
    body: string;

    @Column({ name: 'time_execute'})
    timeRequest: number;

    @Column({name : 'request_at'})
    requestAt: Date;

    @Column( { name : "status_code"})
    statusCode : number;

    @Column({ name : "message"})
    message : string;
}
