import { Request, Response } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import "winston-mongodb";

// const loggerMessage = ;

// const fileSuccessTransports: DailyRotateFile = new DailyRotateFile({
//     filename: "log-info-%DATE%.log",
//     datePattern: "YYYY-MM-DD-HH",
// });

// const fileErrorTransports: DailyRotateFile = new DailyRotateFile({
//     filename: "log-error-%DATE%.log",
//     datePattern: "YYYY-MM-DD-HH",
// });

// const mongoTransport = new winston.transports.MongoDB({
//     db: "mongodb://127.0.0.1:27017/blogAPI",
//     metaKey: "meta",
// });

// success logger
const successLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: "log-info-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    meta: false,
    msg: (req: Request, res: Response) => {
        const options = {
            correlationId: req.headers["x-correlation-id"],
            body: req.body,
        };
        return JSON.stringify(options);
    },
});

// error logger
const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: "log-error-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
        }),
        new winston.transports.MongoDB({
            db: "mongodb://127.0.0.1:27017/blogAPI",
            metaKey: "meta",
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    meta: true,
    msg: "{correlationId: {{req.headers['x-correlation-id']}}, error: {{err.message}}}",
});

export { successLogger, errorLogger };
