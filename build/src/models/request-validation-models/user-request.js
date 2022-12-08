"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    username: joi_1.default.string().min(5).max(30).required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
});
exports.default = userSchema;
