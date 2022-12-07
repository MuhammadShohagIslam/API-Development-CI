import { Schema, model } from "mongoose";
import { PostAttrs, PostModel, PostDoc } from "../../types/post-model.type";

const postSchema = new Schema(
    {
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
