import {
    Types,
    Model,
    Document,
    PopulatedDoc
} from "mongoose";

// an interface describe the properties that required to create a new Post
interface PostAttrs {
    title: string;
    body: string;
    user: string;
}

// an interface describe the properties that Post Document has
interface PostDoc extends Document {
    title: string;
    body: string;
    user: PopulatedDoc<Document<Types.ObjectId>>;
}

// an interface describe the properties that a Post Model has
interface PostModel extends Model<PostDoc> {
    createNewPost(post: PostAttrs): PostDoc;
}

export { PostAttrs, PostDoc, PostModel };