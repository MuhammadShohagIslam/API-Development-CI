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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const ioredis_1 = __importDefault(require("ioredis"));
const redis_memory_server_1 = require("redis-memory-server");
let redisClient;
let redisServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    redisServer = new redis_memory_server_1.RedisMemoryServer();
    const host = yield redisServer.getHost();
    const port = yield redisServer.getPort();
    redisClient = new ioredis_1.default({
        host,
        port,
    });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (redisClient) {
        redisClient.disconnect();
    }
    if (redisServer) {
        yield redisServer.stop();
    }
}));
const createPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.default.Types.ObjectId().toHexString();
    const newPost = {
        title: "This is a awesome test case",
        body: "This is a awesome test case for testing",
        user: userId,
    };
    return yield (0, supertest_1.default)(app_1.default).post("/api/posts").send(newPost);
});
const createComment = (email, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = {
        name: "comment test",
        email: email,
        body: "Good Jest Test",
        postId: postId,
    };
    return yield (0, supertest_1.default)(app_1.default).post("/api/comments").send(newComment);
});
describe("Create New Post Suit", () => {
    test("return 200 if new post is created", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield createPost();
        expect(response.status).toBe(200);
    }));
    test("return 404 if request data is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = new mongoose_1.default.Types.ObjectId().toHexString();
        const newPost = {
            title: "",
            body: "This is a awesome test case for testing",
            user: userId,
        };
        yield (0, supertest_1.default)(app_1.default).post("/api/posts").send(newPost).expect(400);
    }));
});
describe("Get All Post Test Suit", () => {
    test("can fetch list of posts", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createPost();
        yield createPost();
        yield createPost();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/posts")
            .send()
            .expect(200);
        expect(response.body.length).toEqual(3);
    }));
});
describe("Get Post By Post Id Test Suit", () => {
    test("return status 200 and length 1 if post has", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createPost();
        const postId = yield (yield createPost()).body.id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/posts/${postId}`)
            .send()
            .expect(200);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            title: "This is a awesome test case",
            body: "This is a awesome test case for testing",
        });
    }));
    test("return status 404 if the post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const postId = new mongoose_1.default.Types.ObjectId().toHexString();
        const response = yield (0, supertest_1.default)(app_1.default).get(`/api/posts/${postId}`).send();
        expect(response.status).toBe(404);
    }));
});
describe("Get Post By User Id Test Suit", () => {
    test("return status 404 if post not found by user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = new mongoose_1.default.Types.ObjectId().toHexString();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/posts/users/${userId}`)
            .send();
        expect(response.status).toBe(400);
    }));
});
describe("Get Comment By Post Id Test Suit", () => {
    test("return status 200 if comment has", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        const comment = yield createComment("test1@gmail.com", createPostResponse.body.id);
        const cachingData = (key, callback) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cachedData = yield redisClient.get(`posts/${comment.body.postId}/comments`);
                if (cachedData !== null) {
                    expect(JSON.parse(cachedData)).toBeDefined();
                }
                const freshData = yield callback();
                yield redisClient.set(`posts/${comment.body.postId}/comments`, JSON.stringify(freshData), "EX", 200);
                return freshData;
            }
            catch (error) {
            }
        });
        const data = yield cachingData(`posts/${comment.body.postId}/comments`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get(`/api/posts/${comment.body.postId}/comments`)
                .send();
            return response;
        }));
        expect(data).toBeDefined();
    }));
    test("return status 404 if comment not found by post ", () => __awaiter(void 0, void 0, void 0, function* () {
        const postId = new mongoose_1.default.Types.ObjectId().toHexString();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/posts/${postId}/comments`)
            .send();
        expect(response.status).toBe(400);
    }));
});
describe("Update Post Test Suit", () => {
    test("return 200 if post is updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const createNewPost = yield createPost();
        const updatePostId = createNewPost.body.id;
        const updatedPost = {
            title: "Updated Post Good Test",
            body: "Updated Post Good Test for Body",
        };
        yield (0, supertest_1.default)(app_1.default)
            .patch(`/api/posts/${updatePostId}`)
            .send(updatedPost)
            .expect(200);
    }));
    test("return 404 if post has not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const postId = new mongoose_1.default.Types.ObjectId().toHexString();
        const updatedPost = {
            title: "Updated Post Good Test",
            body: "Updated Post Good Test for Body",
        };
        yield (0, supertest_1.default)(app_1.default)
            .patch(`/api/posts/${postId}`)
            .send(updatedPost)
            .expect(404);
    }));
    test("return error if invalid post data provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield createPost();
        const updatePostId = post.body.id;
        const updatedPost = {
            title: "",
            body: "Updated Post Good Test for Body",
        };
        try {
            yield (0, supertest_1.default)(app_1.default)
                .patch(`/api/posts/${updatePostId}`)
                .send(updatedPost);
        }
        catch (error) {
            expect(error).toThrow();
        }
    }));
});
describe("Delete The Post Suit", () => {
    test("return 404 if the post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedId = new mongoose_1.default.Types.ObjectId().toHexString();
        yield (0, supertest_1.default)(app_1.default).delete(`/api/posts/${deletedId}`).expect(404);
    }));
    test("return 200 if the post is deleted successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createPost();
        yield createPost();
        const deletedId = yield (yield createPost()).body.id;
        yield (0, supertest_1.default)(app_1.default).delete(`/api/posts/${deletedId}`).expect(200);
    }));
});
