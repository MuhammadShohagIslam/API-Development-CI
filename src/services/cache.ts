import { client } from "../config/redis.db.config";
import { BadRequestError, NotFoundError } from "../errors";

const EXPIRATION = 100;

const cachingData = async (
    key: string,
    collectionName: string,
    paramId: string,
    callback: () => Promise<any>
) => {
    try {
        const cachedData = await client.get(key);

        if (cachedData !== null) {
            return JSON.parse(cachedData);
        }

        const freshData = await callback();

        if (freshData.length === 0) {
            throw `${
                collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
            } Not Found By ${paramId}`;
        }

        await client.set(key, JSON.stringify(freshData), {
            EX: EXPIRATION,
            NX: true,
        });

        return freshData;
    } catch (error) {
        if (
            error ===
            `${
                collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
            } Not Found By ${paramId}`
        ) {
            throw new NotFoundError(
                `${
                    collectionName.charAt(0).toUpperCase() +
                    collectionName.slice(1)
                } Not Found By  ${paramId}`
            );
        }
        throw new BadRequestError(`Bad User Request by ${key}`);
    }
};

export { cachingData };
