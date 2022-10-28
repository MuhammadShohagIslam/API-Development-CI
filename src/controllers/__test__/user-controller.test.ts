import request from "supertest";
import app from "../../app";

jest.mock("../../services/user-service");

describe("Get All User Test Suit", () => {
    test("status code should be return 200", async () => {
        const response = await request(app).get("/api/users");
        expect(response.status).toBe(200);
    });
    test("should return array of user", async () => {
        const response = await request(app).get("/api/users");
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("Create New User Test Suit", () => {
    test("status code should be return 201", async () => {
        const user = {
            username: "abcdefgh",
            email: "abcd@gmail.com",
        };
        const response = await request(app).post("/api/users").send(user);
        expect(response.status).toBe(201);
        const newUserId = response.body._id;
        const responseSingleUser = await request(app).get(
            `/api/users/${newUserId}`
        );
        expect(responseSingleUser.statusCode).toBe(200);
    });
});

describe("Update A Existing User Test Suit", () => {
    test("status code should return 201", async () => {
        const updateId = "1";
        const updateUser = {
            username: "testIsAwesome",
            email: "test@gmail.com",
        };
        const response = await request(app)
            .patch(`/api/users/${updateId}`)
            .send(updateUser);
        expect(response.status).toBe(201);
    });
    test("should return updated user", async () => {
        const updateId = "1";
        const responseUpdateUser = await request(app).get(`/api/users/${updateId}`);
        expect(responseUpdateUser.body).toBeDefined();
    });
});

describe("Delete User Test Suit", () => {
    test("status code should return 200", async () => {
        const removeId = "1";
        const response = await request(app).delete(`/api/users/${removeId}`);
        expect(response.status).toBe(200);
    });
    test("should return error for wrong user id", async () => {
        const removeId = "2";
        const response = await request(app).delete(`/api/users/${removeId}`);
        expect(response.body.errors[0].message).toBe(
            `User Not Found By The ${removeId}`
        );
    });
});
