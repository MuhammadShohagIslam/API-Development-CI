import mongoose from "mongoose";
import Comment from "../comment-model";

const commentData = {
    name: "Awesome Model Test",
    email: "test@gmail.com",
    body: "Awesome Test Body Comment",
    postId: new mongoose.Types.ObjectId().toHexString(),
};

describe("Comment Model Test Suit", () => {
    test("comment created and saved successfully", async () => {
        const comment = Comment.createNewComment(commentData);
        const savedComment = await comment.save();

        expect(savedComment._id).toBeDefined();
        expect(savedComment.email).toBe(commentData.email);
        expect(JSON.stringify(savedComment.postId)).toBe(
            JSON.stringify(commentData.postId)
        );
    });
});
