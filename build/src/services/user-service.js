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
exports.removeUserService = exports.updateUserService = exports.getUserService = exports.createUserService = exports.getAllUserService = void 0;
const errors_1 = require("../errors");
const data_models_1 = require("../models/data-models");
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email } = user;
    const newUser = data_models_1.User.createNewUser({ username, email });
    const saveNewUser = yield newUser.save();
    return saveNewUser;
});
exports.createUserService = createUserService;
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_models_1.User.find({}).exec();
    return users;
});
exports.getAllUserService = getAllUserService;
const getUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_models_1.User.findById({ _id: userId }).exec();
    if (!user) {
        throw new errors_1.NotFoundError(`User Not Found By The userId Of ${userId}`);
    }
    return user;
});
exports.getUserService = getUserService;
const updateUserService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield data_models_1.User.findOneAndUpdate({ _id: userId }, updateData, {
        new: true,
    }).exec();
    return updatedUser;
});
exports.updateUserService = updateUserService;
const removeUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_models_1.User.findById({ _id: userId }).exec();
    if (user) {
        const removeUser = yield data_models_1.User.deleteOne({ _id: userId });
        return removeUser;
    }
    throw new errors_1.NotFoundError(`User Not Found By The userId Of ${userId}`);
});
exports.removeUserService = removeUserService;
