import mongoose from "mongoose";
import { client } from "../config/redis.db.config";


const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function() {
    console.log("Executing overtime")
    console.log(this.getOptions())
    return exec.apply(this);
}