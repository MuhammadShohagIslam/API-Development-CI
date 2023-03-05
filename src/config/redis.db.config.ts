import Redis from 'ioredis';

let client:Redis;
const connectRedis = async () => {
    try {
        const redis = new Redis({
            host: process.env.REDIS_URL,
            port: parseInt(process.env.REDIS_PORT!),
            password: process.env.REDIS_PW
        });
        client = redis;
    } catch (error) {
        console.log(error);
    }
};

export { connectRedis, client };
