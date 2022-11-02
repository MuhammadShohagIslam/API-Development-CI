import {
    Schema,
    model,
    Types,
    Model,
    Document,
    PopulatedDoc,
    Query,
} from "mongoose";

// an interface describe the properties that required to create a new Post
export interface PostAttrs {
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
type Option = {
    key: string;
};

interface ProjectQueryHelpers extends Query<any, any>{
    hashKey:any;
    cachedKey:any;
    byName(options: Option): Query<any, any>;
}
// an interface describe the properties that a Post Model has
interface PostModel extends Model<PostDoc, ProjectQueryHelpers> {
    createNewPost(post: PostAttrs): PostDoc;
}

const postSchema = new Schema(
    {
        postId: {
            type: String,
        },
        title: {
            type: String,
            max: 200,
            min: 10,
            required: true,
        },
        body: {
            type: String,
            min: 200,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                ret.published = ret.createdAt;
                delete ret._id;
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;
            },
        },
    }
);

(postSchema as Schema<any> & { query: any }).query.byName = function (
    options = <Option>{}
): Query<any,any> & ProjectQueryHelpers {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || "");
    class Good extends Query<any, any>{
        hashKey:any;
        useCache:any;
        constructor(useCache:boolean, options:Option){
            super();
            this.useCache = useCache;
            this.hashKey = JSON.stringify(options.key || "");
            Object.setPrototypeOf(this, Good.prototype);
        }
    }
    const a = new Good(true, options);
    this.cachedHashKey = a;
    return this;
};

postSchema.statics.createNewPost = (post: PostAttrs) => {
    return new Post(post);
};

const Post = model<PostDoc, PostModel>("Posts", postSchema);

export default Post;
