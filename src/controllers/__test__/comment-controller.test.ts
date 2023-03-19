import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";

const createPost = async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const newPost = {
        title: "This is a awesome test case",
        body: "This is a awesome test case for testing",
        user: userId,
    };
    return await request(app).post("/api/posts").send(newPost);
};

const createComment = async (email: string, postId:string) => {
    const newComment = {
        name: "comment test",
        email: email,
        body: "Good Jest Test",
        postId: postId,
    };
    return await request(app).post("/api/comments").send(newComment);
};



describe("Create New Comment Suit", () => {
    test("return 404 if request data is not valid", async () => {
        const postId = new mongoose.Types.ObjectId().toHexString();
        const newComment = {
            name: "",
            email: "test@gmail.com",
            postId: postId,
        };
        await request(app).post("/api/comments").send(newComment).expect(400);
    });
});

describe("Get All Comment Test Suit", () => {
    test("can fetch list of comments", async () => {
        const createPostResponse = await createPost();
        await createComment("test1@gmail.com",createPostResponse.body.id);
        await createComment("test2@gmail.com",createPostResponse.body.id);
        await createComment("test3@gmail.com",createPostResponse.body.id);

        const response = await request(app)
            .get("/api/comments")
            .send()
            .expect(200);
        console.log(response.body.length)
        expect(response.body.length).toEqual(3);
    });
});

describe("Get Comment By Comment Id Test Suit", () => {
    test("return status 404 if the comment is not found", async () => {
        const commentId = new mongoose.Types.ObjectId().toHexString();

        const response = await request(app)
            .get(`/api/comments/${commentId}`)
            .send();

        expect(response.status).toBe(404);
    });
});

describe("Update Comment Test Suit", () => {
    test("return 404 if comment has not found", async () => {
        const commentId = new mongoose.Types.ObjectId().toHexString();
        const updatedComment = {
            name: "updated comment test",
            body: "Good Jest updated comment Test",
        };

        await request(app)
            .patch(`/api/comments/${commentId}`)
            .send(updatedComment)
            .expect(404);
    });
    test("return error if invalid comment data provided", async () => {
        const createPostResponse = await createPost();
        const post = await createComment("test1@gmail.com",createPostResponse.body.id);;
        const updatePostId = post.body.id;

        const updatedComment = {
            name: "",
            body: "Good Jest updated comment Test",
        };

        try {
            await request(app)
                .patch(`/api/comments/${updatePostId}`)
                .send(updatedComment);
        } catch (error) {
            expect(error).toThrow();
        }
    });
});

describe("Delete The Comment Suit", () => {
    test("return 404 if the comment is not found", async () => {
        const deletedId = new mongoose.Types.ObjectId().toHexString();
        await request(app).delete(`/api/comments/${deletedId}`).expect(404);
    });
});
