export interface ResponseVO {
    statusCode: number;
    headers: Object;
    body?: Object;
}

export interface ResponseBodyVO {
    code: string;
    codeDesc: string;
    data: any;
}
