import models from "../models";
import { UserAttrs } from "../models/user";

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
    return user;
};

const updateUserService = async (id: string, updateData: UserAttrs) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    }).exec();
    return updatedUser;
};

export {
    getAllUserService,
    createUserService,
    getUserService,
    updateUserService,
};
