import { Schema, model, Document, Model, Types } from "mongoose";
import isEmail from "validator/lib/isEmail";

// an interface describe the properties that required to create new comment
interface CommentAttrs {
    name: String;
    email: String;
    body: String;
}

// an interface describe the properties that comment document has
interface CommentDoc extends Document {
    name: string;
    email: string;
    body: string;
    createdAt: Date;
}

// an interface describe the properties that comment model has
interface CommentModel extends Model<CommentDoc> {
    createNewComment(attrs: CommentAttrs): CommentDoc;
}

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
        post: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
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
