import { Schema, model, Document, Model, Types, PopulatedDoc } from "mongoose";
import isEmail from "validator/lib/isEmail";

// an interface describe the properties that required to create new comment
export interface CommentAttrs {
    name: string;
    email: string;
    body: string;
    postId:string;
}

// an interface describe the properties that comment document has
interface CommentDoc extends Document {
    name: string;
    email: string;
    body: string;
    postId:PopulatedDoc<Document<Types.ObjectId>>,
    commentedAt: Date;
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
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                ret.commentedAt =ret.createdAt;
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
