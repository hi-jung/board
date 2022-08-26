
// entity
import dayjs from 'dayjs';
// entity
import {TbReply} from '../model/entities/TbReply';
// vo
import { Reply } from '../model/vo/reply.vo';
// util
import { query } from '../utils/database.util';
// logger
import { logger } from '../utils/logger.util';
// common
import * as common from '../common/common'
import { StatusCode } from '../common/statuscode';
import { ResponseBodyVO } from '../model/vo/response.vo';
import { Keyword } from '../model/vo/keyword.vo';


/**
 * Comment: TB_KEYWORD select 쿼리
 * Date: 2022.08.27
 * @param ke
 * @returns result
 */
 export const insert = async (username: string, keywordList: Array<string>): Promise<ResponseBodyVO> => {
    try {
        let values = '';
        for (let i = 0; i < keywordList.length; i++) {
            const keyword = keywordList[i];
            values += i == 0 ? ` ('${username}','${keyword}') ` : `, ('${username}','${keyword}') `
        }
        const insertStr = `INSERT INTO TB_KEYWORD 
                                (TK_USERNAME, TK_KEYWORD) 
                              VALUES 
                                ${values}`;
        const res = await query(insertStr, []);
        return res;
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] keyword.service.ts - insert FAIL!!, Error code: ${error.code}, message: ${error.message}`)
        return {
            code: StatusCode.CODE_500_000,
            codeDesc: StatusCode.DESC_500_000 + ` ${error.message}`,
            data: null
        }
    }
}

