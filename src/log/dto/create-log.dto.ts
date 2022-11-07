export class CreateLogDto {
    method: string;
    body: string;
    path: string;
    param: string;
    query: string;
    headers: string;
    timeRequest? : number;
    requestAt: Date;
    statusCode? : number;
    message? : string;
}
