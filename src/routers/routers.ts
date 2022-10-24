import express from "express";
import { postRouter, userRouter } from "../controllers";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/users", userRouter);

export default router;
