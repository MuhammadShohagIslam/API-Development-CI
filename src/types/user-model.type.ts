import { Model, Document } from "mongoose";

// An interface describe the properties that required to create a new User
interface UserAttrs {
    id?: String;
    username: String;
    email: String;
}

// an interface describe the properties that User Document has
interface UserDoc extends Document {
    username: String;
    email: String;
    _doc: {
        username: String;
        email: String;
    };
}

// an interface describe the properties that a User Model has
interface UserModel extends Model<UserDoc> {
    createNewUser(attrs: UserAttrs): UserDoc;
}

export { UserAttrs, UserDoc, UserModel };
