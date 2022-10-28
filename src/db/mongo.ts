import mongoose, { ConnectOptions } from "mongoose";

//connection mongoDB
const url = process.env.MONGODB_URI;

const options = { useUnifiedTopology: true } as ConnectOptions;
function connectWithMongoDB() {
    mongoose.connect(url!, options, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("MongoDB is connected successfully!");
        }
    });
}

export { connectWithMongoDB, url };
