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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const request_validate_1 = __importDefault(require("../middlewares/request-validate"));
const request_validation_models_1 = require("../models/request-validation-models");
const user_service_1 = require("../services/user-service");
const router = express_1.default.Router();
exports.userRouter = router;
// logger
const log = (msg) => console.log(msg);
const createUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, user_service_1.createUserService)(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
const getAllUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_service_1.getAllUserService)();
    res.status(200).json(users);
});
const getUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield (0, user_service_1.getUserService)(userId);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const updatedUser = yield (0, user_service_1.updateUserService)(userId, req.body);
    res.status(201).json(updatedUser);
});
const removeUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const removed = yield (0, user_service_1.removeUserService)(userId);
        res.status(200).json(removed);
    }
    catch (error) {
        next(error);
    }
});
router.post("/", (0, request_validate_1.default)(request_validation_models_1.userSchema), createUserHandler);
router.get("/", getAllUserHandler);
router.get("/:userId", getUserHandler);
router.patch("/:userId", (0, request_validate_1.default)(request_validation_models_1.userSchema), updateUserHandler);
router.delete("/:userId", removeUserHandler);
