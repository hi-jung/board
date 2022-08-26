// npm
import dayjs from 'dayjs'
import { Request } from 'koa';
import { Paging } from '../model/vo/request.vo';
import { ResponseVO } from '../model/vo/response.vo';

// log
import { logger } from '../utils/logger.util';

/**
 * Comment: offset, limit 을 return
 * Date: 2022.08.26
 * @param page parameter로 넘겨받은 page
 * @param viewCount parameter로 넘겨받은 viewCount
 * @returns Paging
 */
 export const getPaging = (page: number, viewCount: number): Paging => {
    return {
        offset: (page -1) * viewCount,
        limit: viewCount
    }
}

/**
 * Comment: Null, undefined check
 * Date: 2022.08.26
 * @param data null check 대상
 * @returns boolean
 */
 export const isNull = (data: any) => {
    if (data === null || data === undefined)
        return true
    else
        return false
}

/**
 * Comment: 현재 시간을 리턴
 * Date: 2022.08.23
 * @returns timestamp
 */
export const getStarttime = () => {
    return dayjs().toDate().getTime()
}

/**
 * Comment: (시작시간 - 현재 시간)을 리턴
 * Date: 2022.08.23
 * @returns timestamp
 */
export const getStoptime = (starttime) => {
    return (dayjs().toDate().getTime() - starttime)
}

/**
 * Comment: Start 로그 공통 method
 * Date: 2022.08.23
 * @param name log name
 * @param message 로그를 남기고자 하는 데이터가 있다면 전달
 */
 export const startLog = (name: string, message: string) => {
    logger.info(`[${name}] START TIME :: ${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}${message == '' ? '' : `, message: ${message}`}`);
};

/**
 * Comment: End 로그 공통 method
 * Date: 2022.08.23
 * @param name log name
 * @param time start 부터 end 까지 걸린 시간
 */
 export const endLog = (name: string, time: number) => {
    logger.info(`[${name}] END TIME :: ${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}, time: ${time}ms`);
};

/**
 * Comment: Service log를 남기기 위한 공통 method
 * Date: 2022.08.26
 * @param name name
 * @param file file name
 * @param func function name
 * @param message developer message
 * @param errorType error flag (logger.error)
 */
 export const serviceLog = (name: string, file: string, func: string, message: string, errorType: boolean) => {
    if (errorType) {
        logger.error(`[${name}] message: ${message}, file: '${file}', function: '${func}'`);
    } else {
        logger.info(`[${name}] message: ${message}, file: '${file}', function: '${func}'`);
    }
};

/**
 * Comment: Error Response 공통 method
 * Date: 2022.08.26
 * @param file file name
 * @param func function name
 * @param request ctx.request
 * @param response ResponseVO
 * @param errorType error flag (logger.error)
 */
 export const httpResponseLog = (file: string, func: string, request: Request, response: ResponseVO, errorType: boolean) => {
    const requestInfo = {
        url: request.url,
        method: request.method,
        param: request.method === 'GET' ? request.query : request.body
    }

    if (errorType) {
        logger.error('========================================================================================================================');
        logger.error(`         time: ${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}`);
        logger.error(`         file: '${file}'`);
        logger.error(`function name: '${func}'`);
        logger.error(`      Request: '${JSON.stringify(requestInfo)}'`);
        logger.error(`     Response: '${JSON.stringify(response)}'`);
        logger.error('========================================================================================================================');
    } else {
        logger.info('========================================================================================================================');
        logger.info(`         time: ${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}`);
        logger.info(`         file: '${file}'`);
        logger.info(`function name: '${func}'`);
        logger.info(`      Request: '${JSON.stringify(requestInfo)}'`);
        logger.info(`     Response: '${JSON.stringify(response)}'`);
        logger.info('========================================================================================================================');
    }
};