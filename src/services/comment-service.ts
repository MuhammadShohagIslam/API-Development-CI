import { CommentAttrs } from "../models/data-models/comment-model";
import { Comment } from "../models/data-models";
import { BadRequestError, NotFoundError } from "../errors";

const createCommentService = async (comment: CommentAttrs) => {
    const isAlreadyEmailExist = await Comment.findOne({
        email: comment.email,
    }).exec();
    if (isAlreadyEmailExist) {
        throw new BadRequestError("Email Is Already Exist");
    }
    const newComment = Comment.createNewComment(comment);
    const saveNewComment = await newComment.save();
    return saveNewComment;
};

const getAllCommentService = async () => {
    const comments = await Comment.find({}).exec();
    return comments;
};

const getCommentByIdService = async (commentId: string) => {
    const comment = await Comment.findById({ _id: commentId }).exec();

    if (!comment) {
        throw new NotFoundError(
            `Comment Not Found By The commentId Of ${commentId}`
        );
    }
    return comment;
};

const getCommentByPostIdService = async (postId: string) => {
    const commentByPost = await Comment.find({ post: postId }).exec();

    if (commentByPost.length === 0) {
        throw new NotFoundError(
            `Comment Not Found By The commentId Of ${postId}`
        );
    }
    return commentByPost;
};

const updateCommentService = async (
    updatedCommentData: CommentAttrs,
    commentId: string
) => {
    const comment = await Comment.findById({ _id: commentId }).exec();
    if (!comment) {
        throw new NotFoundError(
            `Comment Not Found By The commentId Of ${commentId}`
        );
    }

    const isAlreadyEmailExist = await Comment.findOne({
        email: updatedCommentData.email,
    }).exec();

    if (updatedCommentData.email === isAlreadyEmailExist?.email) {
        throw new BadRequestError("Email is Already Exist");
    }

    const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId },
        updatedCommentData,
        { new: true }
    ).exec();

    return updatedComment;
};

const removeCommentService = async (commentId: string) => {
    const comment = await Comment.findById({ _id: commentId }).exec();
    if (comment) {
        await Comment.deleteOne({ _id: commentId }).exec();
        return comment.id;
    }
    throw new NotFoundError(
        `Comment Not Found By The commentId Of ${commentId}`
    );
};

export {
    createCommentService,
    getAllCommentService,
    getCommentByIdService,
    getCommentByPostIdService,
    updateCommentService,
    removeCommentService,
};
