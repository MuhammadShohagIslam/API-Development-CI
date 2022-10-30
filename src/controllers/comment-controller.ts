import express, { Request, Response, NextFunction } from "express";
import validateRequest from "../middlewares/request-validate";
import {
    postSchema,
    postUpdateSchema,
} from "../models/request-validation-models";
import {
    createCommentService,
    getAllCommentService,
    getCommentByIdService,
    getCommentByPostIdService,
    updateCommentService,
    removeCommentService,
} from "../services/post-service";

const router = express.Router();

const createCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newPost = await createCommentService(req.body);
        res.status(200).json(newPost);
    } catch (error) {
        next(error);
    }
};
const getAllCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await getAllCommentService();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};
const getCommentByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const postsByUser = await getCommentByIdService(req.params.userId);
        res.status(200).json(postsByUser);
    } catch (error) {
        next(error);
    }
};
const getCommentByPostIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const post = await getCommentByPostIdService(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};
const updateCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { postId } = req.params;
        const updatePostData = req.body;

        const post = await updateCommentService(updatePostData, postId);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};
const removeCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const removedPost = await removeCommentService(req.params.postId);
        res.status(200).json(removedPost);
    } catch (error) {
        next(error);
    }
};

router.post("/", validateRequest(postSchema), createCommentHandler);
router.get("/", getAllCommentHandler);
router.get("/posts/:commentId", getCommentByPostIdHandler);
router.get("/:commentId", getCommentByIdHandler);
router.patch("/:commentId", validateRequest(postUpdateSchema), updateCommentHandler);
router.delete("/:commentId", removeCommentHandler);

export { router as postRouter };
