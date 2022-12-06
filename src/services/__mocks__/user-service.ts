import { NotFoundError } from "../../errors";
import { UserAttrs } from "../../types/user-model.type";
import { User } from "./../../models/data-models";

const users: UserAttrs[] = [
    {
        id: "1",
        username: "abcdefgh",
        email: "abcd@gmail.com",
    },
];

export const getAllUserService = async () => {
    return users;
};

export const getUserService = async (id: string) => {
    const user = users.find((x) => x.id == id);
    return user;
};

export const createUserService = async (requestBody: UserAttrs) => {
    const { username, email } = requestBody;

    const { _doc } = User.createNewUser({ username, email });
    users.push(_doc);
    return _doc;
};

export const updateUserService = async (id: string, updateData: UserAttrs) => {
    let getUserById = await getUserService(id);

    if (getUserById) {
        getUserById.email = updateData.email;
        getUserById.username = updateData.username;
    }
    return getUserById;
};

export const removeUserService = async (id: string) => {
    let getUserIndexById = users.findIndex((user) => user.id == id);
    if (getUserIndexById == 0) {
        const deletedUserId = users[getUserIndexById].id;
        users.splice(getUserIndexById, 1);
        return deletedUserId;
    } else {
        throw new NotFoundError(`User Not Found By The ${id}`);
    }
};
