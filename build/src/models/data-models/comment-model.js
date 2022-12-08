"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const commentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        max: [40, "To Long"],
        min: [5, "To Short"],
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [isEmail_1.default, "Please enter a valid email"],
    },
    body: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Posts",
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            ret.commentedAt = ret.createdAt;
            delete ret.createdAt;
            delete ret._id;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
});
commentSchema.statics.createNewComment = (attrs) => {
    return new Comment(attrs);
};
const Comment = (0, mongoose_1.model)("Comments", commentSchema);
exports.default = Comment;
