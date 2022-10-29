import express, { Request, Response, NextFunction } from "express";
import validateRequest from "../middlewares/request-validate";
import {
    postSchema,
    postUpdateSchema,
} from "../models/request-validation-models";
import {
    createPostService,
    getAllPostService,
    getPostByUserIdService,
    getPostByPostIdService,
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
const getPostByUserIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const postsByUser = await getPostByUserIdService(req.params.userId);
        res.status(200).json(postsByUser);
    } catch (error) {
        next(error);
    }
};
const getPostByPostIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await getPostByPostIdService(req.params.postId);
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

router.post("/", validateRequest(postSchema), createPostHandler);
router.get("/", getAllPostHandler);
router.get("/user/:userId", getPostByUserIdHandler);
router.get("/:postId", getPostByPostIdHandler);
router.patch("/:postId", validateRequest(postUpdateSchema), updatePostHandler);
router.delete("/:postId", removePostHandler);

export { router as postRouter };
