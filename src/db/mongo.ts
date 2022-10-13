import mongoose from "mongoose";

//connection mongoDB
const url = "mongodb://127.0.0.1:27017/blogAPI";
const options = {};
function connectWithMongoDB() {
    mongoose.connect(url, options, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("MongoDB is connected successfully!");
        }
    });
}

export default connectWithMongoDB