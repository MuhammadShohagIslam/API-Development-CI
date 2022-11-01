import app from "./app";
import { connectWithMongoDB } from "./config/mongo.db.config";
import { connectWithRedis } from "./config/redis.db.config";

app.listen(3000, async () => {
    connectWithMongoDB();
    await connectWithRedis();
    console.log("Listening on port 3000");
});
