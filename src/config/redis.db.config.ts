import {
    createClient,
    RedisClientType,
    RedisModules,
    RedisFunctions,
    RedisScripts,
} from "redis";

let client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
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

export { connectRedis, client };
