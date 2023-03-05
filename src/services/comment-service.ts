import { BadRequestError, NotFoundError } from "../errors";
import { Comment, Post } from "../models/data-models";
import { CommentAttrs } from "../types/comment-model.type";
import { clearHash } from "../caching/cache.v2";

const createCommentService = async (comment: CommentAttrs) => {
    const isAlreadyEmailExist = await Comment.findOne({
        email: comment.email,
    }).exec();
    const isAlreadyPostExist = await Post.findOne({
        _id: comment.postId,
    }).exec();
    if (isAlreadyEmailExist) {
        throw new BadRequestError("Email Is Already Exist");
    }
    if (!isAlreadyPostExist) {
        throw new BadRequestError("Post Not Exist");
    }
    const newComment = Comment.createNewComment(comment);
    const saveNewComment = await newComment.save();
    // clear the cache
    clearHash(comment.postId);
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
    // version 01 caching
    // const commentByPost = await cachingData(
    //     `posts/${postId}/comments`,
    //     Comment.collection.name.slice(0, -1),
    //     postId,
    //     async () => {
    //         const data = await Comment.find({ postId: postId }).exec();
    //         return data;
    //     }
    // );

    // version2 caching
    const commentByPost = await Comment.find({ postId: postId }).cache({
        key: postId,
    });
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

    const isAlreadyUserExist = await Comment.findOne({
        email: updatedCommentData.email,
    }).exec();

    if (
        updatedCommentData.email !== undefined &&
        isAlreadyUserExist?.email !== undefined &&
        isAlreadyUserExist?.email === updatedCommentData.email
    ) {
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
