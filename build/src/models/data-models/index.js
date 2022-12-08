"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.User = exports.Post = void 0;
const user_model_1 = __importDefault(require("./user-model"));
exports.User = user_model_1.default;
const post_model_1 = __importDefault(require("./post-model"));
exports.Post = post_model_1.default;
const comment_model_1 = __importDefault(require("./comment-model"));
exports.Comment = comment_model_1.default;
