import models from "../models";
import { UserAttrs } from "../models/user";
import { BadRequestError } from "./../errors/bad-request-error";

const User = models.User;

const createUserService = async (requestBody: UserAttrs) => {
    const { username, email } = requestBody;

    const newUser = User.build({ username, email });
    const saveNewUser = await newUser.save();

    return saveNewUser;
};

const getAllUserService = async () => {
    const users = await User.find({}).exec();
    return users;
};

const getUserService = async (id: string) => {
    const user = await User.findById({ _id: id }).exec();
    if (!user) {
        throw new BadRequestError("User Not Found");
    }
    return user;
};

const updateUserService = async (id: string, updateData: UserAttrs) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    }).exec();
    return updatedUser;
};

const removeUserService = async (id: string) => {
    const user = await User.findById({ _id: id }).exec();

    if (user) {
        const removeUser = await User.deleteOne({ _id: id });
        console.log(removeUser);
        return removeUser;
    }
    throw new BadRequestError("User Not Found");
};

export {
    getAllUserService,
    createUserService,
    getUserService,
    updateUserService,
    removeUserService,
};
