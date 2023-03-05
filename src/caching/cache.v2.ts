import { Query } from "mongoose";
import { client } from "../config/redis.db.config";

type CacheOptions = { key?: string };

declare module "mongoose" {
    interface DocumentQuery<
        T,
        DocType extends import("mongoose").Document,
        QueryHelpers = {}
    > {
        cache(
            options: CacheOptions
        ): DocumentQuery<T[], Document> & QueryHelpers;
        useCache: boolean;
        hashKey: string;
    }

    interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
        extends DocumentQuery<any, any> {}
}

const exec = Query.prototype.exec;

Query.prototype.cache = function (options: CacheOptions) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options?.key || "");
    return this;
};

Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments as any);
    }

    const cacheValue = await client.get(JSON.stringify(this.hashKey));
    // checking cacheValue has
    if (cacheValue) {
        const cacheValuesParse = JSON.parse(cacheValue);
        return Array.isArray(cacheValuesParse)
            ? cacheValuesParse.map(
                  (cacheValueParse) => new this.model(cacheValueParse)
              )
            : new this.model(cacheValuesParse);
    }

    // if it has not available cache to store the cache
    const result = await exec.apply(this, arguments as any);
    await client.set(
        JSON.stringify(this.hashKey),
        JSON.stringify(result),
        "EX",
        2000
    );
    return result;
};

const clearHash = (hashKey: string) => {
    client.del(JSON.stringify(hashKey));
};

export { clearHash };
