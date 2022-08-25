// npm
import dayjs from 'dayjs'

// log
import { logger } from '../utils/logger.util';

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
 */
 export const endLog = (name: string, time: number) => {
    logger.info(`[${name}] END TIME :: ${dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')}, time: ${time}ms`);
};