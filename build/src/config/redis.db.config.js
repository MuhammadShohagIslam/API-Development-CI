"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.connectRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
let client;
exports.client = client;
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const redis = new ioredis_1.default({
            host: process.env.REDIS_URL,
            port: 19609,
            password: process.env.REDIS_PW
        });
        exports.client = client = redis;
    }
    catch (error) {
        console.log(error);
    }
});
exports.connectRedis = connectRedis;
