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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const request_validate_1 = __importDefault(require("../middlewares/request-validate"));
const request_validation_models_1 = require("../models/request-validation-models");
const comment_service_1 = require("../services/comment-service");
const post_service_1 = require("../services/post-service");
const router = express_1.default.Router();
exports.postRouter = router;
const createPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield (0, post_service_1.createPostService)(req.body);
        res.status(200).json(newPost);
    }
    catch (error) {
        next(error);
    }
});
const getAllPostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, post_service_1.getAllPostService)();
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
const getPostByUserIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsByUser = yield (0, post_service_1.getPostByUserIdService)(req.params.userId);
        res.status(200).json(postsByUser);
    }
    catch (error) {
        next(error);
    }
});
const getPostByPostIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, post_service_1.getPostByPostIdService)(req.params.postId);
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
const getCommentByPostIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentByPost = yield (0, comment_service_1.getCommentByPostIdService)(req.params.postId);
        res.status(200).json(commentByPost);
    }
    catch (error) {
        next(error);
    }
});
const updatePostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const updatePostData = req.body;
        const post = yield (0, post_service_1.updatePostService)(updatePostData, postId);
        res.status(200).json(post);
    }
    catch (error) {
        next(error);
    }
});
const removePostHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removedPost = yield (0, post_service_1.removePostService)(req.params.postId);
        res.status(200).json(removedPost);
    }
    catch (error) {
        next(error);
    }
});
router.post("/", (0, request_validate_1.default)(request_validation_models_1.postSchema), createPostHandler);
router.get("/", getAllPostHandler);
router.get("/users/:userId", getPostByUserIdHandler);
router.get("/:postId/comments", getCommentByPostIdHandler);
router.get("/:postId", getPostByPostIdHandler);
router.patch("/:postId", (0, request_validate_1.default)(request_validation_models_1.postUpdateSchema), updatePostHandler);
router.delete("/:postId", removePostHandler);
