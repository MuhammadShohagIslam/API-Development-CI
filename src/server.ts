import app from "./app";
import { connectWithMongoDB } from "./config/mongo.db.config";
import { connectWithRedis } from "./config/redis.db.config";

const start = async () => {
    
    await connectWithMongoDB();
    await connectWithRedis();

    app.listen(3000, async () => {
        console.log("Listening on port 3000");
    });
};

start();
