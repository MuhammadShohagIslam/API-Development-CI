import { createClient } from "redis";

let client: any;
const connectRedis = async () => {
    try {
        const redisClient = createClient({
            url: process.env.REDIS_URL,
            password: process.env.REDIS_PW,
        });
        await redisClient.connect();

        client = redisClient;
    } catch (error) {
        console.log(error);
    }
};

export { client, connectRedis };
