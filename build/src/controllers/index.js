"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = exports.userRouter = exports.postRouter = void 0;
const user_controller_1 = require("./user-controller");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_controller_1.userRouter; } });
const post_controller_1 = require("./post-controller");
Object.defineProperty(exports, "postRouter", { enumerable: true, get: function () { return post_controller_1.postRouter; } });
const comment_controller_1 = require("./comment-controller");
Object.defineProperty(exports, "commentRouter", { enumerable: true, get: function () { return comment_controller_1.commentRouter; } });
