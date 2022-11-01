import mongoose from "mongoose";

async function connectWithMongoDB() {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL must be defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

export { connectWithMongoDB };
