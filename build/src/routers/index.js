"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routers_1 = __importDefault(require("./routers"));
const rootRouters = (app) => {
    app.use("/api", routers_1.default);
};
exports.default = rootRouters;
