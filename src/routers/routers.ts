import express from "express";
import { postRouter, userRouter, commentRouter } from "../controllers";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/users", userRouter);

export default router;
