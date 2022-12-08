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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserService = exports.updateUserService = exports.createUserService = exports.getUserService = exports.getAllUserService = void 0;
const errors_1 = require("../../errors");
const data_models_1 = require("./../../models/data-models");
const users = [
    {
        id: "1",
        username: "abcdefgh",
        email: "abcd@gmail.com",
    },
];
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    return users;
});
exports.getAllUserService = getAllUserService;
const getUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = users.find((x) => x.id == id);
    return user;
});
exports.getUserService = getUserService;
const createUserService = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = requestBody;
    const { _doc } = data_models_1.User.createNewUser({ username, email });
    users.push(_doc);
    return _doc;
});
exports.createUserService = createUserService;
const updateUserService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    let getUserById = yield (0, exports.getUserService)(id);
    if (getUserById) {
        getUserById.email = updateData.email;
        getUserById.username = updateData.username;
    }
    return getUserById;
});
exports.updateUserService = updateUserService;
const removeUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let getUserIndexById = users.findIndex((user) => user.id == id);
    if (getUserIndexById == 0) {
        const deletedUserId = users[getUserIndexById].id;
        users.splice(getUserIndexById, 1);
        return deletedUserId;
    }
    else {
        throw new errors_1.NotFoundError(`User Not Found By The ${id}`);
    }
});
exports.removeUserService = removeUserService;
