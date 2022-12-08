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
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const request_validate_1 = __importDefault(require("../middlewares/request-validate"));
const request_validation_models_1 = require("../models/request-validation-models");
const comment_service_1 = require("../services/comment-service");
const router = express_1.default.Router();
exports.commentRouter = router;
const createCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = yield (0, comment_service_1.createCommentService)(req.body);
        res.status(200).json(newComment);
    }
    catch (error) {
        next(error);
    }
});
const getAllCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield (0, comment_service_1.getAllCommentService)();
        res.status(200).json(comments);
    }
    catch (error) {
        next(error);
    }
});
const getCommentByIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentById = yield (0, comment_service_1.getCommentByIdService)(req.params.commentId);
        res.status(200).json(commentById);
    }
    catch (error) {
        next(error);
    }
});
const updateCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const updateCommentData = req.body;
        const comment = yield (0, comment_service_1.updateCommentService)(updateCommentData, commentId);
        res.status(200).json(comment);
    }
    catch (error) {
        next(error);
    }
});
const removeCommentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removedComment = yield (0, comment_service_1.removeCommentService)(req.params.commentId);
        res.status(200).json(removedComment);
    }
    catch (error) {
        next(error);
    }
});
router.post("/", (0, request_validate_1.default)(request_validation_models_1.commentSchema), createCommentHandler);
router.get("/", getAllCommentHandler);
router.get("/:commentId", getCommentByIdHandler);
router.patch("/:commentId", (0, request_validate_1.default)(request_validation_models_1.commentUpdateSchema), updateCommentHandler);
router.delete("/:commentId", removeCommentHandler);
