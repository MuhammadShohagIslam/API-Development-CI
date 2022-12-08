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
exports.removePostService = exports.updatePostService = exports.getPostByPostIdService = exports.getPostByUserIdService = exports.getAllPostService = exports.createPostService = void 0;
const data_models_1 = require("../models/data-models");
const errors_1 = require("../errors");
const cache_1 = require("./cache");
const createPostService = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = data_models_1.Post.createNewPost(post);
    const saveNewPost = yield newPost.save();
    return saveNewPost;
});
exports.createPostService = createPostService;
const getAllPostService = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield data_models_1.Post.find({}).exec();
    return posts;
});
exports.getAllPostService = getAllPostService;
const getPostByPostIdService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield data_models_1.Post.findById({ _id: postId }).populate("user").exec();
    if (!post) {
        throw new errors_1.NotFoundError(`Post Not Found By The postId Of ${postId}`);
    }
    return post;
});
exports.getPostByPostIdService = getPostByPostIdService;
const getPostByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const postsByUser = yield (0, cache_1.cachingData)(`posts/users?userId=${userId}`, data_models_1.Post.collection.name, userId, () => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield data_models_1.Post.find({ user: userId }).exec();
        return data;
    }));
    return postsByUser;
});
exports.getPostByUserIdService = getPostByUserIdService;
const updatePostService = (updatedPostData, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield data_models_1.Post.findById({ _id: postId }).exec();
    if (!post) {
        throw new errors_1.NotFoundError(`Post Not Found By The postId Of ${postId}`);
    }
    const updatedPost = yield data_models_1.Post.findOneAndUpdate({ _id: postId }, updatedPostData, { new: true }).exec();
    return updatedPost;
});
exports.updatePostService = updatePostService;
const removePostService = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield data_models_1.Post.findById({ _id: postId }).exec();
    if (post) {
        yield data_models_1.Post.deleteOne({ _id: postId }).exec();
        return post.id;
    }
    throw new errors_1.NotFoundError(`Post Not Found By The postId Of ${postId}`);
});
exports.removePostService = removePostService;
