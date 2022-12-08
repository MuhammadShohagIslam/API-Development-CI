"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            ret.userCreatedAt = ret.createdAt;
            delete ret._id;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
});
userSchema.statics.createNewUser = (attrs) => {
    return new User(attrs);
};
const User = (0, mongoose_1.model)("Users", userSchema);
exports.default = User;
