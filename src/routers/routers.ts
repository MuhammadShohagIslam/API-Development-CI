import express from "express";
import { userRouters } from "../controllers";

const router = express.Router();

router.use("/users", userRouters);

export default router;
