import express, { Request, Response } from "express";
import {
    createPostService,
    getAllPostService,
    getPostService,
    updatePostService,
    removePostService,
} from "../services/post-service";

const router = express.Router();

const createPostHandler = (req: Request, res: Response) => {};
const getAllPostHandler = (req: Request, res: Response) => {};
const getPostHandler = (req: Request, res: Response) => {};
const updatePostHandler = (req: Request, res: Response) => {};
const removePostHandler = (req: Request, res: Response) => {};

router.post("/", createPostHandler);
router.get("/", getAllPostHandler);
router.get("/:postId", getPostHandler);
router.patch("/:postId", updatePostHandler);
router.delete("/:postId", removePostHandler);

export { router as postRouter };
