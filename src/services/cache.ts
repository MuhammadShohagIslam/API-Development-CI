import { client } from "../config/redis.db.config";


const EXPIRATION = 100;

const cachingData = async (key: string, callback:()=> Promise<any>) => {

    const cachedData = await client.get(key);

    if (cachedData) {
        console.log("redis")
        return JSON.parse(cachedData);
    }

    const freshData = await callback();

    await client.set(key, JSON.stringify(freshData),{
        EX: EXPIRATION,
        NX: true
    });
    console.log("server")
    return freshData;
};

export { cachingData };
