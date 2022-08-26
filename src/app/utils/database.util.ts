// npm
import mysql from 'mysql2/promise';

// config
import Config from '../../config/config.json';

// logger
import { logger }  from '../utils/logger.util';

// common
import * as common from '../common/common'


let pool;
export const createPool = async () => {
    const db_config = {
        host: Config.database.host,
        user: Config.database.username,
        password: Config.database.password,
        port: Config.database.port,
        database: Config.database.name,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
    pool = mysql.createPool(db_config);
}

export const query = async (query, param) => {
    try {
        const conn: any = await pool.getConnection();
        const [row, fields] = await conn.query(query, param);
        common.serviceLog('util', 'database.util.ts', 'query', `query SUCCESS!!, param: ${JSON.stringify(param)}, row: ${JSON.stringify(row)}`, false)
        conn.connection.release();
        return row;

    } catch(e) {
        const error: any = e;
        logger.error(`[util] database.util.ts - query FAIL!!, Error code: ${error.code}, message: ${error.message}, param: ${JSON.stringify(param)}`, true)
        return null;
    }
}







