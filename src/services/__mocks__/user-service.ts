import { UserAttrs } from "../../models/user";
import models from "./../../models";

const User = models.User;

const users: UserAttrs[] = [
    {
        _id: "1",
        username: "abcdefgh",
        email: "abcd@gmail.com",
    },
];

export const getAllUserService = async () => {
    return users;
};

export const getUserService = async (id: string) => {
    const user = users.find((x) => x._id == id);
    return user;
};

export const createUserService = async (requestBody: UserAttrs) => {
    const { username, email } = requestBody;

    const { _doc } = User.build({ username, email });
    users.push(_doc);
    return _doc;
};
