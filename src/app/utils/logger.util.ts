
// npm
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');


// log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};

// console setting
const alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true,
    }),
    winston.format.label({
        label: "[LOGGER]",
    }),
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),

    /**
     * winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`)
     * logger.info("hello world");     => [2022-02-23 16:59:25.285] | [info] | hello world
     * logger.error("hello world");    => [2022-02-23 16:59:25.286] | [error] | hello world
     * logger.warn("hello world");     => [2022-02-23 16:59:25.287] | [warn] | hello world
     * logger.debug("hello world");    => [2022-02-23 16:59:25.287] | [debug] | hello world
     * logger.verbose("hello world");  => [2022-02-23 16:59:25.288] | [verbose] | hello world
     */    
    winston.format.printf((info) => `[${info.timestamp}] | [${info.level}] | ${info.message}`)
);


// log file setting
const notalignColorsAndTime = winston.format.combine(
    winston.format.label({
        label: "[LOGGER]",
    }),
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    winston.format.printf((info) => `[${info.timestamp}] | [${info.level}] | ${info.message}`)
);


let logger: any;
/**
 * logger initialize
 * @param config 설정 정보
 */
export const initialize = (config) => {
    logger = winston.createLogger({
        level: "debug",
        transports: [
            // service log setting
            new winstonDaily({
                level: config.log.service.level,
                filename: config.log.service.path,
                maxsize: "10m",
                maxFiles: "7d",
                zippedArchive: true,
                format: winston.format.combine(notalignColorsAndTime),
            }),

            // error log setting
            new winstonDaily({
                level: config.log.error.level,
                filename: config.log.error.path,
                maxsize: "10m",
                maxFiles: "7d",
                zippedArchive: true,
                format: winston.format.combine(notalignColorsAndTime),
            }),
    
            // local console setting
            new winston.transports.Console({
                //level: config.log.error.level,
                format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
            }),
        ],
    });
}

export { logger };