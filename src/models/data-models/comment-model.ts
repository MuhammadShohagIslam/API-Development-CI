import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import {
    CommentAttrs,
    CommentDoc,
    CommentModel,
} from "../../types/comment-model.type";

const commentSchema = new Schema(
    {
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
            validate: [isEmail, "Please enter a valid email"],
        },
        body: {
            type: String,
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
        },
    },
    {
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
    }
);

commentSchema.statics.createNewComment = (attrs: CommentAttrs) => {
    return new Comment(attrs);
};

const Comment = model<CommentDoc, CommentModel>("Comments", commentSchema);

export default Comment;
