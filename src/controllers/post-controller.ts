import express, { Request, Response, NextFunction } from "express";
import validateRequest  from "../middlewares/request-validate";
import { postSchema } from "../models/request-validation-models";
import {
    createPostService,
    getAllPostService,
    getPostService,
    updatePostService,
    removePostService,
} from "../services/post-service";

const router = express.Router();

const createPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newPost = await createPostService(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        next(error);
    }
};
const getAllPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await getAllPostService();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};
const getPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await getPostService(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};
const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { postId } = req.params;
        const updatePostData = req.body;

        const post = await updatePostService(updatePostData, postId);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};
const removePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const removedPost = await removePostService(req.params.postId);
        res.status(200).json(removedPost);
    } catch (error) {
        next(error);
    }
};

router.post("/", validateRequest(postSchema) ,createPostHandler);
router.get("/", getAllPostHandler);
router.get("/:postId", getPostHandler);
router.patch("/:postId",validateRequest(postSchema), updatePostHandler);
router.delete("/:postId", removePostHandler);

export { router as postRouter };
