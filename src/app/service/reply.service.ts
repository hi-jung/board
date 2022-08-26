
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
import { Paging } from '../model/vo/request.vo';


/**
 * Comment: TB_REPLY select 쿼리
 * Date: 2022.08.27
 * @param reply Reply
 * @returns result
 */
 export const select = async (reply: Reply, depth: number, paging?: Paging): Promise<ResponseBodyVO> => {
    try {
        let limit = ''
        if (!common.isNull(paging)) {
            limit = `LIMIT ${paging?.offset},${paging?.limit}`
        }
        const selectStr = `SELECT 
                                TR_ID,
                                TB_ID,
                                TR_USERNAME,
                                TR_CONTENT,
                                TR_REGIST_DATE,
                                TR_DEPTH,
                                TR_PARENT_ID
                              FROM
                                TB_REPLY
                              WHERE TB_ID = ? AND TR_DEPTH = ?
                              ORDER BY TR_ID ASC
                              ${limit}`;
        console.log(selectStr)
        const selectParam = [
            reply.tbId,
            depth
        ]
        const res = await query(selectStr, selectParam);
        return res;

    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] reply.service.ts - select FAIL!!, Error code: ${error.code}, message: ${error.message}`)
        return {
            code: StatusCode.CODE_500_000,
            codeDesc: StatusCode.DESC_500_000 + ` ${error.message}`,
            data: null
        }
    }
}


/**
 * Comment: TB_REPLY insert 쿼리
 * Date: 2022.08.25
 * @param reply Reply
 * @returns result
 */
export const insert = async (reply: Reply): Promise<ResponseBodyVO> => {
    try {
        const insertStr = `INSERT INTO TB_REPLY 
                                (TB_ID, TR_USERNAME, TR_CONTENT, TR_REGIST_DATE, TR_DEPTH, TR_PARENT_ID) 
                              VALUES 
                                (?,?,?,?,?,?)`;

        const date = dayjs().toDate();
        const insertParam = [
            reply.tbId,
            reply.username,
            reply.content,
            date,
            reply.depth,
            reply.parentId
        ]
        const res = await query(insertStr, insertParam);
        return res;
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] reply.service.ts - insert FAIL!!, Error code: ${error.code}, message: ${error.message}`)
        return {
            code: StatusCode.CODE_500_000,
            codeDesc: StatusCode.DESC_500_000 + ` ${error.message}`,
            data: null
        }
    }
}
