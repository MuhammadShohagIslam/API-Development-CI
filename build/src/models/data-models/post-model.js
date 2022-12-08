"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        max: 200,
        min: 10,
        required: true,
    },
    body: {
        type: String,
        min: 200,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            ret.published = ret.createdAt;
            delete ret._id;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
});
postSchema.statics.createNewPost = (post) => {
    return new Post(post);
};
const Post = (0, mongoose_1.model)("Posts", postSchema);
exports.default = Post;
