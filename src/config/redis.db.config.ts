import { createClient } from "redis";

let client: any;

async function connectWithRedis() {
    const redisClient = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PW,
    });

    try {
        await redisClient.connect();
        client = redisClient;
        console.log("Redis connected");
    } catch (error) {
        console.log(error);
    }
}

export { connectWithRedis, client };
