"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCommentService = exports.updateCommentService = exports.getCommentByPostIdService = exports.getCommentByIdService = exports.getAllCommentService = exports.createCommentService = void 0;
const data_models_1 = require("../models/data-models");
const errors_1 = require("../errors");
const cache_1 = require("./cache");
const createCommentService = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const isAlreadyEmailExist = yield data_models_1.Comment.findOne({
        email: comment.email,
    }).exec();
    const isAlreadyPostExist = yield data_models_1.Post.findOne({
        _id: comment.postId,
    }).exec();
    if (isAlreadyEmailExist) {
        throw new errors_1.BadRequestError("Email Is Already Exist");
    }
    if (!isAlreadyPostExist) {
        throw new errors_1.BadRequestError("Post Not Exist");
    }
    const newComment = data_models_1.Comment.createNewComment(comment);
    const saveNewComment = yield newComment.save();
    return saveNewComment;
});
exports.createCommentService = createCommentService;
const getAllCommentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield data_models_1.Comment.find({}).exec();
    return comments;
});
exports.getAllCommentService = getAllCommentService;
const getCommentByIdService = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield data_models_1.Comment.findById({ _id: commentId }).exec();
    if (!comment) {
        throw new errors_1.NotFoundError(`Comment Not Found By The commentId Of ${commentId}`);
    }
    return comment;
});
exports.getCommentByIdService = getCommentByIdService;
const getCommentByPostIdService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentByPost = yield (0, cache_1.cachingData)(`posts/${postId}/comments`, data_models_1.Comment.collection.name.slice(0, -1), postId, () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield data_models_1.Comment.find({ postId: postId }).exec();
        return data;
    }));
    if (commentByPost.length === 0) {
        throw new errors_1.NotFoundError(`Comment Not Found By The postId Of ${postId}`);
    }
    return commentByPost;
});
exports.getCommentByPostIdService = getCommentByPostIdService;
const updateCommentService = (updatedCommentData, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield data_models_1.Comment.findById({ _id: commentId }).exec();
    if (!comment) {
        throw new errors_1.NotFoundError(`Comment Not Found By The commentId Of ${commentId}`);
    }
    const isAlreadyUserExist = yield data_models_1.Comment.findOne({
        email: updatedCommentData.email,
    }).exec();
    if (updatedCommentData.email !== undefined &&
        (isAlreadyUserExist === null || isAlreadyUserExist === void 0 ? void 0 : isAlreadyUserExist.email) !== undefined &&
        (isAlreadyUserExist === null || isAlreadyUserExist === void 0 ? void 0 : isAlreadyUserExist.email) === updatedCommentData.email) {
        throw new errors_1.BadRequestError("Email is Already Exist");
    }
    const updatedComment = yield data_models_1.Comment.findOneAndUpdate({ _id: commentId }, updatedCommentData, { new: true }).exec();
    return updatedComment;
});
exports.updateCommentService = updateCommentService;
const removeCommentService = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield data_models_1.Comment.findById({ _id: commentId }).exec();
    if (comment) {
        yield data_models_1.Comment.deleteOne({ _id: commentId }).exec();
        return comment.id;
    }
    throw new errors_1.NotFoundError(`Comment Not Found By The commentId Of ${commentId}`);
});
exports.removeCommentService = removeCommentService;
