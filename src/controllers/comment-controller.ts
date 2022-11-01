import express, { Request, Response, NextFunction } from "express";
import validateRequest from "../middlewares/request-validate";
import {
    commentSchema,
    commentUpdateSchema,
} from "../models/request-validation-models";
import {
    createCommentService,
    getAllCommentService,
    getCommentByIdService,
    updateCommentService,
    removeCommentService,
} from "../services/comment-service";

const router = express.Router();

const createCommentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newComment = await createCommentService(req.body);
        res.status(200).json(newComment);
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
        const comments = await getAllCommentService();
        res.status(200).json(comments);
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
        const commentById = await getCommentByIdService(req.params.commentId);
        res.status(200).json(commentById);
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
        const { commentId } = req.params;
        const updateCommentData = req.body;

        const comment = await updateCommentService(
            updateCommentData,
            commentId
        );
        res.status(200).json(comment);
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
        const removedComment = await removeCommentService(req.params.commentId);
        res.status(200).json(removedComment);
    } catch (error) {
        next(error);
    }
};

router.post("/", validateRequest(commentSchema), createCommentHandler);
router.get("/", getAllCommentHandler);
router.get("/:commentId", getCommentByIdHandler);
router.patch(
    "/:commentId",
    validateRequest(commentUpdateSchema),
    updateCommentHandler
);
router.delete("/:commentId", removeCommentHandler);

export { router as commentRouter };
