import mongoose from "mongoose";
import { client } from "../config/redis.db.config";

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
   
    const [arg] = arguments;
    const results = await exec.apply(this, arg);
    return results;
};
