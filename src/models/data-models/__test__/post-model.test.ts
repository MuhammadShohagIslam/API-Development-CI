import mongoose from "mongoose";
import Post from "../post-model";

const postData = {
    title: "Awesome Post Model Test",
    body: "This is a awesome post model test case for testing",
    user: new mongoose.Types.ObjectId().toHexString(),
};

describe("Post Model Test Suit", () => {
    test("Post Create And Save Successfully", async () => {
        const post = Post.createNewPost(postData);

        const savedPost = await post.save();

        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(postData.title);
        expect(JSON.stringify(savedPost.user)).toBe(
            JSON.stringify(postData.user)
        );
    });
});
