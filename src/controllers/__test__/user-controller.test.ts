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

describe("createUserHandler Test Suit", () => {
    test("status code should be return 201", async () => {
        const user = {
            username: "abcdfgsgfsjh",
            email:"abcd@gmail.com"
        }
        const response = await request(app).post("/users").send(user);
        console.log(response.body);
        expect(response.status).toBe(201);
        const newUserId = response.body._id
        const responseSingleUser = await request(app).get(`/users/${newUserId}`);
        expect(responseSingleUser.statusCode).toBe(200);

    });
});

