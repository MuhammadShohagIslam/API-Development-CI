import mongoose, { ConnectOptions } from "mongoose";

const connectWithMongoDB = () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL must be defined");
        }
        mongoose
            .connect(process.env.MONGO_URL, {
                dbName: "API-Blog",
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions)
            .then((db) => {
                console.log("MongoDB Database is connected!");
            })
            .catch((err) => {
                console.log("Error Connecting to the Database");
            });
    } catch (error) {
        console.log(`MongoDB connection is failed!. ${error}`);
    }
};

export default connectWithMongoDB;

