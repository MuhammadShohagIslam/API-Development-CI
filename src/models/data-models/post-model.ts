import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            max: 200,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Post = model("Posts", postSchema);

export { Post };
