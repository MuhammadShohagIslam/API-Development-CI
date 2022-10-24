import { Schema, model, Types, Model, Document } from "mongoose";

// an interface describe the properties that required to create a new Post
export interface PostAttrs {
    title: string;
    body: string;
    user: Types.ObjectId;
}

// an interface describe the properties that Post Document has
interface PostDoc extends Document {
    title: string;
    body: string;
    user: Types.ObjectId;
}

// an interface describe the properties that a Post Model has
interface PostModel extends Model<PostDoc> {
    createNewPost(post: PostAttrs): PostDoc;
}

const postSchema = new Schema(
    {
        title: {
            type: String,
            max: 200,
            min: 15,
            required: true,
        },
        body: {
            type: String,
            min: 200,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

postSchema.statics.createNewPost = (post: PostAttrs) => {
    return new Post(post);
};

const Post = model<PostDoc, PostModel>("Posts", postSchema);

export default Post;
