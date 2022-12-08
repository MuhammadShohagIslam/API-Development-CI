"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentUpdateSchema = exports.commentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const commentSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(40).required(),
    email: joi_1.default.string().email({ minDomainSegments: 2 }).required(),
    body: joi_1.default.string().required(),
    postId: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Post Id Is Not Match")
        .required(),
});
exports.commentSchema = commentSchema;
const commentUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(40),
    email: joi_1.default.string().email({ minDomainSegments: 2 }),
    body: joi_1.default.string(),
    postId: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Post Id Is Not Match"),
});
exports.commentUpdateSchema = commentUpdateSchema;
