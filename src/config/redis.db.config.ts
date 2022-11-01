import { createClient, RedisClientType } from "redis";

let redis: any;

async function connectWithRedis() {
    const client = createClient({
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PW,
    });

    client.on("error", (error) => console.log(error));
    await client.connect();
    redis = client;
}

export { connectWithRedis, redis };
