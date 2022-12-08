"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.successLogger = void 0;
const express_winston_1 = __importDefault(require("express-winston"));
const winston_1 = __importDefault(require("winston"));
// import DailyRotateFile from "winston-daily-rotate-file";
require("winston-mongodb");
// success logger
const successLogger = () => express_winston_1.default.logger({
    transports: [
        new winston_1.default.transports.Console(),
        // new DailyRotateFile({
        //     filename: "log-info-%DATE%.log",
        //     datePattern: "YYYY-MM-DD-HH",
        // }),
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json(), winston_1.default.format.prettyPrint()),
    meta: false,
    msg: (req, res) => {
        const options = {
            correlationId: req.headers["x-correlation-id"],
            body: req.body,
        };
        return JSON.stringify(options);
    },
});
exports.successLogger = successLogger;
// error logger
const errorLogger = () => express_winston_1.default.errorLogger({
    transports: [
        new winston_1.default.transports.Console(),
        // new DailyRotateFile({
        //     filename: "log-error-%DATE%.log",
        //     datePattern: "YYYY-MM-DD-HH",
        // }),
        new winston_1.default.transports.MongoDB({
            level: "error",
            db: process.env.MONGO_URL,
            metaKey: "meta",
        }),
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json(), winston_1.default.format.prettyPrint()),
    meta: true,
    msg: "{correlationId: {{req.headers['x-correlation-id']}}, error: {{err.message}}}",
});
exports.errorLogger = errorLogger;
