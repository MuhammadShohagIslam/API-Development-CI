import { Schema, model, Types, Model, Document, PopulatedDoc } from "mongoose";

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
    user: PopulatedDoc<Document<Types.ObjectId>>;
}

// an interface describe the properties that a Post Model has
interface PostModel extends Model<PostDoc> {
    createNewPost(post: PostAttrs): PostDoc;
}

const postSchema = new Schema(
    {
        postId: {
            type: String,
        },
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
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    {
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
    }
);

postSchema.statics.createNewPost = (post: PostAttrs) => {
    return new Post(post);
};

const Post = model<PostDoc, PostModel>("Posts", postSchema);

export default Post;
