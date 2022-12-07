import { Document, Model, Types, PopulatedDoc } from "mongoose";

// an interface describe the properties that required to create new comment
interface CommentAttrs {
    name: string;
    email: string;
    body: string;
    postId: string;
}

// an interface describe the properties that comment document has
interface CommentDoc extends Document {
    name: string;
    email: string;
    body: string;
    postId: PopulatedDoc<Document<Types.ObjectId>>;
    commentedAt: Date;
}

// an interface describe the properties that comment model has
interface CommentModel extends Model<CommentDoc> {
    createNewComment(attrs: CommentAttrs): CommentDoc;
}

export { CommentAttrs, CommentDoc, CommentModel };
