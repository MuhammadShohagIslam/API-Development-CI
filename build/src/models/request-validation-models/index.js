"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentUpdateSchema = exports.commentSchema = exports.postUpdateSchema = exports.userSchema = exports.postSchema = void 0;
const user_request_1 = __importDefault(require("./user-request"));
exports.userSchema = user_request_1.default;
const post_request_1 = require("./post-request");
Object.defineProperty(exports, "postSchema", { enumerable: true, get: function () { return post_request_1.postSchema; } });
Object.defineProperty(exports, "postUpdateSchema", { enumerable: true, get: function () { return post_request_1.postUpdateSchema; } });
const comment_request_1 = require("./comment-request");
Object.defineProperty(exports, "commentSchema", { enumerable: true, get: function () { return comment_request_1.commentSchema; } });
Object.defineProperty(exports, "commentUpdateSchema", { enumerable: true, get: function () { return comment_request_1.commentUpdateSchema; } });
