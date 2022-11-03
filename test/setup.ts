import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";


process.env.ENVIRONMENT = "TEST";
let mongo: MongoMemoryServer;


beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
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
