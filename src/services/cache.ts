import mongoose, {Query} from "mongoose";
import { client } from "../config/redis.db.config";


const exec = mongoose.Query.prototype.exec;


mongoose.Query.prototype.exec = async function () {

    // const key = JSON.stringify(
    //     Object.assign({}, this.getFilter(), {
    //         collection: this.model.collection.name,
    //     })
    // );

    // const cachedValue = await client.get(key);

    // if (cachedValue) {
    //     const doc = JSON.parse(cachedValue);
    //     return Array.isArray(doc)
    //         ? doc.map((d) => new this.model(d))
    //         : new this.model(doc);
    // }

    console.log("Coming From Server");
    const [arg] = arguments;
    const results = await exec.apply(this);
    // await client.set(key, JSON.stringify(results));
    return results;
};
