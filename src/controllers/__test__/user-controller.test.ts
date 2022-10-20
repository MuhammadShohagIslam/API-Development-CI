import request from "supertest";
import app from "../../app";

jest.mock("../../services/user-service");

describe("getAllUserHandler Test Suit", () => {
    test("status code should be return 200", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
    });
    test("it is should return array of user",async () => {
        const response = await request(app).get("/users");
        expect(response.body.length).toBeGreaterThan(0);
    })
});

