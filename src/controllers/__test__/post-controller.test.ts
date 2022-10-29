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

describe("Get All Post Test Suit", () => {
    test("can fetch list of posts", async () => {
        await createPost();
        await createPost();
        await createPost();

        const response = await request(app)
            .get("/api/posts")
            .send()
            .expect(200);
        expect(response.body.length).toEqual(3);
    });
});

describe("Get Post By Post Id Test Suit", () => {
    test("return status 200 and length 1 if post has", async () => {
        await createPost();

        const postId = await (await createPost()).body.id;

        const response = await request(app)
            .get(`/api/posts/${postId}`)
            .send()
            .expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: "This is a awesome test case",
            body: "This is a awesome test case for testing",
        });
    });
    test("return status 404 if the post is not found", async () => {
        const postId = new mongoose.Types.ObjectId().toHexString();

        const response = await request(app).get(`/api/posts/${postId}`).send();

        expect(response.status).toBe(404);
    });
});

describe("Get Post By User Id Test Suit", () => {
    test("return status 200 if post has", async () => {
        const postsResponse = await createPost();

        const response = await request(app)
            .get(`/api/posts/user/${postsResponse.body.user}`)
            .send();
        expect(response.status).toBe(200);
    });
    test("return status 404 if post not found by user", async () => {
        const userId = new mongoose.Types.ObjectId().toHexString();

        const response = await request(app)
            .get(`/api/posts/user/${userId}`)
            .send();

        expect(response.status).toBe(404);
    });
});
