import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo:MongoMemoryServer;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUrl = mongo.getUri();

    await mongoose.connect(mongoUrl, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.disconnect();
});

process.env.ENVIRONMENT = "TEST";
