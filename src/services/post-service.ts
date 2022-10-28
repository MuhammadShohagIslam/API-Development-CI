import { PostAttrs } from "../models/data-models/post-model";
import { Post } from "../models/data-models";
import { NotFoundError } from "../errors";

const createPostService = async (post: PostAttrs) => {
    const newPost = Post.createNewPost(post);
    const saveNewPost = await newPost.save();
    return saveNewPost;
};

const getAllPostService = async () => {
    const posts = await Post.find({}).exec();
    return posts;
};

const getPostByPostIdService = async (postId: string) => {
    const post = await Post.findById({ _id: postId }).populate("user").exec();

    if (!post) {
        throw new NotFoundError(`Post Not Found By The postId Of ${postId}`);
    }
    return post;
};

const getPostByUserIdService = async (userId: string) => {
    const postsByUser = await Post.find({ user: userId }).populate("user").exec();

    if (!postsByUser) {
        throw new NotFoundError(`Post Not Found By The postId Of ${userId}`);
    }
    return postsByUser;
};

const updatePostService = async (
    updatedPostData: PostAttrs,
    postId: string
) => {
    const post = await Post.findById({ _id: postId }).exec();
    if (!post) {
        throw new NotFoundError(`Post Not Found By The postId Of ${postId}`);
    }

    const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        updatedPostData,
        { new: true }
    ).exec();

    return updatedPost;
};

const removePostService = async (postId: string) => {
    const post = await Post.findById({ _id: postId }).exec();
    if (post) {
        await Post.deleteOne({ _id: postId }).exec();
        return post.id;
    }
    throw new NotFoundError(`Post Not Found By The postId Of ${postId}`);
};

export {
    createPostService,
    getAllPostService,
    getPostByUserIdService,
    getPostByPostIdService,
    updatePostService,
    removePostService,
};
