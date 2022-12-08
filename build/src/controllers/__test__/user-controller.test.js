"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
jest.mock("../../services/user-service");
describe("Get All User Test Suit", () => {
    test("status code should be return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(response.status).toBe(200);
    }));
    test("should return array of user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get("/api/users");
        expect(response.body.length).toBeGreaterThan(0);
    }));
});
describe("Create New User Test Suit", () => {
    test("status code should be return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: "abcdefgh",
            email: "abcd@gmail.com",
        };
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(user);
        expect(response.status).toBe(201);
        const newUserId = response.body._id;
        const responseSingleUser = yield (0, supertest_1.default)(app_1.default).get(`/api/users/${newUserId}`);
        expect(responseSingleUser.statusCode).toBe(200);
    }));
});
describe("Update A Existing User Test Suit", () => {
    test("status code should return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateId = "1";
        const updateUser = {
            username: "testIsAwesome",
            email: "test@gmail.com",
        };
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/api/users/${updateId}`)
            .send(updateUser);
        expect(response.status).toBe(201);
    }));
    test("should return updated user", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateId = "1";
        const responseUpdateUser = yield (0, supertest_1.default)(app_1.default).get(`/api/users/${updateId}`);
        expect(responseUpdateUser.body).toBeDefined();
    }));
});
describe("Delete User Test Suit", () => {
    test("status code should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const removeId = "1";
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/users/${removeId}`);
        expect(response.status).toBe(200);
    }));
    test("should return error for wrong user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const removeId = "2";
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/api/users/${removeId}`);
        expect(response.body.errors[0].message).toBe(`User Not Found By The ${removeId}`);
    }));
});
