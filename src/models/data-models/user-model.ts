import { Schema, model, Document, Model } from "mongoose";

// An interface describe the properties that required to create a new User
export interface UserAttrs {
    id?: string | number;
    username: String;
    email: String;
}

// an interface describe the properties that User Document has
interface UserDoc extends Document {
    id: string | number;
    username: String;
    email: String;
    _doc: {
        id: string | number;
        username: String;
        email: String;
    };
}

// an interface describe the properties that a User Model has
interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = model<UserDoc, UserModel>("Users", userSchema);

export default User;
