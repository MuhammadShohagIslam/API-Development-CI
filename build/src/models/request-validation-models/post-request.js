"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUpdateSchema = exports.postSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const postSchema = joi_1.default.object({
    title: joi_1.default.string().min(10).max(200).required(),
    body: joi_1.default.string().required(),
    user: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("User Id Is Not Match")
});
exports.postSchema = postSchema;
const postUpdateSchema = joi_1.default.object({
    title: joi_1.default.string().min(10).max(200),
    body: joi_1.default.string(),
});
exports.postUpdateSchema = postUpdateSchema;
