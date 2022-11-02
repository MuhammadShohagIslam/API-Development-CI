import app from "./app";
import { connectWithMongoDB } from "./config/mongo.db.config";
import { connectRedis } from "./config/redis.db.config";

const start =  () => {
    connectRedis();
    connectWithMongoDB();


    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
};

start();
