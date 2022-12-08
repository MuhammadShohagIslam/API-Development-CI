"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.use("/posts", controllers_1.postRouter);
router.use("/comments", controllers_1.commentRouter);
router.use("/users", controllers_1.userRouter);
exports.default = router;
