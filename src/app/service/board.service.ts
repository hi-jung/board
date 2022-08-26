
// entity
import dayjs from 'dayjs';
// entity
import {TbBoard} from '../model/entities/TbBoard';
// vo
import { Board } from '../model/vo/board.vo';
// util
import { query } from '../utils/database.util';
// logger
import { logger } from '../utils/logger.util';


/**
 * Comment: TB_BOARD select 쿼리
 * Date: 2022.08.26
 * @param board Board
 * @returns result
 */
export const select = async (board: Board) => {
    try {
        let where ='';
        const selectStr = `SELECT 
                                TB_ID,
                                TB_USERNAME,
                                TB_TITLE,
                                TB_CONTENT,
                                TB_REGIST_DATE
                              FROM
                                TB_BOARD
                              ${where}
                              ORDER BY TB_ID DESC
                              LIMIT 0,10
        `;
        const res = await query(selectStr, []);
        return res;
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] board.service.ts - select FAIL!!, Error code: ${error.code}, message: ${error.message}`)
    }
}

/**
 * Comment: TB_BOARD insert 쿼리
 * Date: 2022.08.25
 * @param board Board
 * @returns result
 */
export const insert = async (board: Board) => {
    try {
        const insertStr = `INSERT INTO TB_BOARD 
                                (TB_USERNAME, TB_PASSWORD, TB_TITLE, TB_CONTENT, TB_REGIST_DATE, TB_UPDATE_DATE) 
                              VALUES 
                                (?,?,?,?,?,?)`;

        const date = dayjs().toDate();
        const insertParam = [
            board.username,
            board.password,
            board.title,
            board.content,
            date,
            date
        ]
        const res = await query(insertStr, insertParam);

        if (res.affectedRows > 0) {
            return res
        } else {
            return null
        }
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] board.service.ts - insert FAIL!!, Error code: ${error.code}, message: ${error.message}`)
    }
}

/**
 * Comment: TB_BOARD update 쿼리
 * Date: 2022.08.25
 * @param board Board
 * @returns result
 */
export const update = async (board: Board) => {
    try {
        const updateStr = `UPDATE TB_BOARD 
                              SET
                                TB_CONTENT = ?,
                                TB_UPDATE_DATE = ?
                              WHERE
                                TB_ID = ? AND TB_PASSWORD = ?`

        const date = dayjs().toDate();
        const updateParam = [
            board.content,
            date,
            board.tbId,
            board.password
        ]
        const res = await query(updateStr, updateParam);

        if (res.affectedRows > 0) {
            return res
        } else {
            return null
        }
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] board.service.ts - update FAIL!!, Error code: ${error.code}, message: ${error.message}`)
    }
}

/**
 * Comment: TB_BOARD delete 쿼리
 * Date: 2022.08.26
 * @param board Board
 * @returns result
 */
 export const remove = async (board: Board) => {
    try {
        const deleteStr = `DELETE 
                              FROM TB_BOARD
                              WHERE
                                TB_ID = ? AND TB_PASSWORD = ?`
        const deleteParam = [
            board.tbId,
            board.password
        ]
        const res = await query(deleteStr, deleteParam);

        if (res.affectedRows > 0) {
            return res
        } else {
            return null
        }
    } catch (e) {
        const error: any = e;
        logger.error(`[srvc] board.service.ts - delete FAIL!!, Error code: ${error.code}, message: ${error.message}`)
    }
}