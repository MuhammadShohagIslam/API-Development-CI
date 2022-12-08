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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachingData = void 0;
const redis_db_config_1 = require("../config/redis.db.config");
const errors_1 = require("../errors");
const EXPIRATION = 100;
const cachingData = (key, collectionName, paramId, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield redis_db_config_1.client.get(key);
        if (cachedData !== null) {
            return JSON.parse(cachedData);
        }
        const freshData = yield callback();
        if (freshData.length === 0) {
            throw new Error(`${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} Not Found By ${paramId}`);
        }
        yield redis_db_config_1.client.set(key, JSON.stringify(freshData), "EX", EXPIRATION);
        return freshData;
    }
    catch (error) {
        if (error ===
            `${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} Not Found By ${paramId}`) {
            throw new errors_1.NotFoundError(`${collectionName.charAt(0).toUpperCase() +
                collectionName.slice(1)} Not Found By  ${paramId}`);
        }
        throw new errors_1.BadRequestError(`Bad User Request by ${key}`);
    }
});
exports.cachingData = cachingData;
