import { NotFoundError } from "../errors";
import { User } from "../models/data-models";
import { UserAttrs } from "../models/data-models/user-model";


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
        throw new NotFoundError(`User Not Found By The Id Of ${id}`);
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
        return removeUser;
    }
    throw new NotFoundError("User Not Found");
};

export {
    getAllUserService,
    createUserService,
    getUserService,
    updateUserService,
    removeUserService,
};
