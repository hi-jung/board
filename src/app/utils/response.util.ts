// vo
import { ResponseVO, ResponseBodyVO } from "../model/response.vo";

// common
import { StatusCode } from "../common/statuscode";


/**
 * Comment: Response 데이터 규격
 * Date: 2022.08.25
 */
export class ResponseUtil {
  
    // 200
    static success(body: ResponseBodyVO): ResponseVO {
      const result = new Result(200, body.code, body.codeDesc, body.data);
      return result.body();
    }

    // 400
    static badRequestError(message: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_400_000, `${StatusCode.DESC_400_000}${message === "" ? "" : `(${message})`}`, {});
      const response = result.body();  
      return response;
    }

    // 405
    static methodNotAllowed(message: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_405_000, `${StatusCode.DESC_405_000}${message === "" ? "" : `(${message})`}`, {});  
      return result.body();
    }

    // 408
    static timeout(message: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_408_000, `${StatusCode.DESC_408_000}${message === "" ? "" : `(${message})`}`, {});
      return result.body();
    }

    // 500
    static internalServerError(data: Object, message: string): ResponseVO {
      const result = new Result(200, StatusCode.CODE_500_000, `${StatusCode.DESC_500_000}${message === "" ? "" : `(${message})`}`, data);  
      return result.body();
    }

    static error(body: ResponseBodyVO): ResponseVO {
      const result = new Result(200, body.code, body.codeDesc, body.data);
      return result.body();
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