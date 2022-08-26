// vo
import { ResponseVO, ResponseBodyVO } from "../model/vo/response.vo";

// common
import { StatusCode } from "../common/statuscode";
import * as common from '../common/common'
import { Request } from "koa";


/**
 * Comment: Response 데이터 규격
 * Date: 2022.08.25
 */
export class ResponseUtil {
  
    // 200
    static success(request: Request, file: string, name: string, data: any): ResponseVO {
      const result = new Result(200, StatusCode.CODE_200_000, StatusCode.DESC_200_000, data);
      const response = result.body();  
      common.httpResponseLog(file, name, request, response, false)
      return response;
    }

    // 400
    static badRequestError(request: Request, message: string, file: string, name: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_400_000, `${StatusCode.DESC_400_000}${message === "" ? "" : `(${message})`}`, {});
      const response = result.body();  
      common.httpResponseLog(file, name, request, response, true)
      return response;
    }

    // 405
    static methodNotAllowed(request: Request, message: string, file: string, name: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_405_000, `${StatusCode.DESC_405_000}${message === "" ? "" : `(${message})`}`, {});  
      const response = result.body();  
      common.httpResponseLog(file, name, request, response, true)
      return response;
    }

    // 408
    static timeout(request: Request, message: string, file: string, name: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_408_000, `${StatusCode.DESC_408_000}${message === "" ? "" : `(${message})`}`, {});
      const response = result.body();  
      common.httpResponseLog(file, name, request, response, true)
      return response;
    }

    // 500
    static internalServerError(request: Request, data: Object, message: string, file: string, name: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_500_000, `${StatusCode.DESC_500_000}${message === "" ? "" : `(${message})`}`, data);  
      const response = result.body();  
      common.httpResponseLog(file, name, request, response, true)
      return response;
    }

    static error(request: Request, body: ResponseBodyVO, file: string, name: string): ResponseVO {
      const result = new Result(200, body.code, body.codeDesc, body.data);
      const response = result.body();  
      common.httpResponseLog(file, name, request, response, true)
      return response;
    }

}


class Result {
  private statusCode: number;
  private code: string;
  private codeDesc: string;
  private data?: any;

  constructor(statusCode:number, code: string, codeDesc: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.codeDesc = codeDesc;
    this.data = data;
  }

  body(): ResponseVO {
    return {
      statusCode: this.statusCode,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
      },
      body: {
        code: this.code,
        codeDesc: this.codeDesc,
        data: this.data
      }
    };
  }
}