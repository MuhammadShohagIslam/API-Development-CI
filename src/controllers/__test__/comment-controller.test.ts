import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";

const createComment = async (email:string) => {
    const postId = new mongoose.Types.ObjectId().toHexString();
    const newComment = {
        name: "comment test",
        email: email,
        body:"Good Jest Test",
        post: postId,
    };
    return await request(app).post("/api/comments").send(newComment);
};

describe("Create New Comment Suit", () => {
    test("return 200 if new comment is created", async () => {
        const response = await createComment("test@gmail.com");
        expect(response.status).toBe(200);
    });
    test("return 404 if request data is not valid", async () => {
        const postId = new mongoose.Types.ObjectId().toHexString();
        const newComment = {
            name: "",
            email: "test@gmail.com",
            post: postId,
        };
        await request(app).post("/api/comments").send(newComment).expect(400);
    });
});

describe("Get All Comment Test Suit", () => {
    test("can fetch list of comments", async () => {
        await createComment("test1@gmail.com");
        await createComment("test2@gmail.com");
        await createComment("test3@gmail.com");

        const response = await request(app)
            .get("/api/comments")
            .send()
            .expect(200);
        expect(response.body.length).toEqual(3);
    });
});

describe("Get Comment By Comment Id Test Suit", () => {
    test("return status 200 and if comment has", async () => {
        await createComment("test1@gmail.com");

        const commentId = await (await createComment("test2@gmail.com")).body.id;

        const response = await request(app)
            .get(`/api/comments/${commentId}`)
            .send()
            .expect(200);

        expect(response.body).toMatchObject({
            name: "comment test",
            email: "test2@gmail.com",
        });
    });
    test("return status 404 if the comment is not found", async () => {
        const commentId = new mongoose.Types.ObjectId().toHexString();

        const response = await request(app)
            .get(`/api/comments/${commentId}`)
            .send();

        expect(response.status).toBe(404);
    });
});

describe("Get Comment By Post Id Test Suit", () => {
    test("return status 200 if comment has", async () => {
        const comment = await createComment("test1@gmail.com");

        const response = await request(app)
            .get(`/api/comment/posts/${comment.body.post}`)
            .send();
        expect(response.status).toBe(200);
    });
    test("return status 404 if comment not found by post ", async () => {
        const postId = new mongoose.Types.ObjectId().toHexString();

        const response = await request(app)
            .get(`/api/comment/posts/${postId}`)
            .send();

        expect(response.status).toBe(404);
    });
});

