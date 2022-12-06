import app from "./app";
import { connectWithMongoDB } from "./config/mongo.db.config";
import { connectRedis } from "./config/redis.db.config";

const start = async () => {
    const port = process.env.PORT || 5000;
    await connectRedis();
    connectWithMongoDB();

    app.listen(port, () => {
        console.log(`API running on ${port}`);
    });
};

start();
