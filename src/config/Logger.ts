import { Request, Response } from "express";
import expressWinston from "express-winston";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const loggerMessage = (req: Request, res: Response) => {
    const options = {
        correlationId: req.headers["x-correlation-id"],
        body: req.body,
    };
    return JSON.stringify(options);
};

const fileSuccessTransports: DailyRotateFile = new DailyRotateFile({
    filename: "success-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
});
const fileErrorTransports: DailyRotateFile = new DailyRotateFile({
    filename: "error-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
});

// success logger
const successLogger = expressWinston.logger({
    transports: [new winston.transports.Console(), fileSuccessTransports],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    meta: false,
    msg: loggerMessage,
});

// error logger
const errorLogger = expressWinston.errorLogger({
    transports: [new winston.transports.Console(), fileErrorTransports],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    meta: true,
    msg: "{correlationId: {{req.headers['x-correlation-id']}}, error: {{err.message}}}",
});

export { successLogger, errorLogger };
