import models from "../models";
import { UserAttrs } from "../models/user";

const getAllUserService = async () => {
    const User = models.User;
    const users = await User.find({}).exec();
    return users;
};

const createUserService = async (requestBody: UserAttrs) => {
    const { username, email } = requestBody;

    const newUser = models.User.build({ username, email });
    const saveNewUser = await newUser.save();

    return saveNewUser;
};

export { getAllUserService, createUserService };
