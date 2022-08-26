
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


/**
 * Comment: TB_REPLY insert 쿼리
 * Date: 2022.08.25
 * @param reply Reply
 * @returns result
 */
export const insert = async (reply: Reply) => {
    try {
        const insertStr = `INSERT INTO TB_REPLY 
                                (TB_ID, TB_USERNAME, TB_CONTENT, TB_REGIS_DATE, TB_DEPTH, TB_PARENT_ID) 
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

        if (res.affectedRows > 0) {
            return res
        } else {
            return null
        }
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] reply.service.ts - insert FAIL!!, Error code: ${error.code}, message: ${error.message}`)
    }
}
