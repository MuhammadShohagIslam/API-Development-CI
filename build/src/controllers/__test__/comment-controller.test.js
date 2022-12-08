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
describe("Create New Comment Suit", () => {
    test("return 200 if new comment is created", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        const response = yield createComment("test@gmail.com", createPostResponse.body.id);
        expect(response.status).toBe(200);
    }));
    test("return 404 if request data is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
        const postId = new mongoose_1.default.Types.ObjectId().toHexString();
        const newComment = {
            name: "",
            email: "test@gmail.com",
            postId: postId,
        };
        yield (0, supertest_1.default)(app_1.default).post("/api/comments").send(newComment).expect(400);
    }));
});
describe("Get All Comment Test Suit", () => {
    test("can fetch list of comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        yield createComment("test1@gmail.com", createPostResponse.body.id);
        yield createComment("test2@gmail.com", createPostResponse.body.id);
        yield createComment("test3@gmail.com", createPostResponse.body.id);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/api/comments")
            .send()
            .expect(200);
        expect(response.body.length).toEqual(3);
    }));
});
describe("Get Comment By Comment Id Test Suit", () => {
    test("return status 200 and if comment has", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        yield createComment("test1@gmail.com", createPostResponse.body.id);
        const commentId = yield (yield createComment("test2@gmail.com", createPostResponse.body.id)).body.id;
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/comments/${commentId}`)
            .send()
            .expect(200);
        expect(response.body).toMatchObject({
            name: "comment test",
            email: "test2@gmail.com",
        });
    }));
    test("return status 404 if the comment is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentId = new mongoose_1.default.Types.ObjectId().toHexString();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/comments/${commentId}`)
            .send();
        expect(response.status).toBe(404);
    }));
});
describe("Update Comment Test Suit", () => {
    test("return 200 if comment is updated", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        const createNewComment = yield createComment("test1@gmail.com", createPostResponse.body.id);
        const updateCommentId = createNewComment.body.id;
        const updatedComment = {
            name: "updated comment test",
            body: "Good Jest updated comment Test",
        };
        yield (0, supertest_1.default)(app_1.default)
            .patch(`/api/comments/${updateCommentId}`)
            .send(updatedComment)
            .expect(200);
    }));
    test("return 404 if comment has not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentId = new mongoose_1.default.Types.ObjectId().toHexString();
        const updatedComment = {
            name: "updated comment test",
            body: "Good Jest updated comment Test",
        };
        yield (0, supertest_1.default)(app_1.default)
            .patch(`/api/comments/${commentId}`)
            .send(updatedComment)
            .expect(404);
    }));
    test("return error if invalid comment data provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        const post = yield createComment("test1@gmail.com", createPostResponse.body.id);
        ;
        const updatePostId = post.body.id;
        const updatedComment = {
            name: "",
            body: "Good Jest updated comment Test",
        };
        try {
            yield (0, supertest_1.default)(app_1.default)
                .patch(`/api/comments/${updatePostId}`)
                .send(updatedComment);
        }
        catch (error) {
            expect(error).toThrow();
        }
    }));
});
describe("Delete The Comment Suit", () => {
    test("return 404 if the comment is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const deletedId = new mongoose_1.default.Types.ObjectId().toHexString();
        yield (0, supertest_1.default)(app_1.default).delete(`/api/comments/${deletedId}`).expect(404);
    }));
    test("return 200 if the comments is deleted successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const createPostResponse = yield createPost();
        yield createComment("test1@gmail.com", createPostResponse.body.id);
        const deletedId = yield (yield createComment("test2@gmail.com", createPostResponse.body.id)).body.id;
        yield (0, supertest_1.default)(app_1.default).delete(`/api/comments/${deletedId}`).expect(200);
    }));
});
