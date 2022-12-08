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
const post_model_1 = __importDefault(require("../post-model"));
const postData = {
    title: "Awesome Post Model Test",
    body: "This is a awesome post model test case for testing",
    user: new mongoose_1.default.Types.ObjectId().toHexString(),
};
describe("Post Model Test Suit", () => {
    test("Post Create And Save Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = post_model_1.default.createNewPost(postData);
        const savedPost = yield post.save();
        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(postData.title);
        expect(JSON.stringify(savedPost.user)).toBe(JSON.stringify(postData.user));
    }));
});
