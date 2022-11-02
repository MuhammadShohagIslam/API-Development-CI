import { Mongoose, Query } from "mongoose";

declare global {
    namespace Mongoose {
        interface Query {
            cache: any;
        }
    }
}
// declare namespace Mongoose {
//     export interface Query {
//         cache: any;
//         useCache: any;
//         hashKey: any;
//     }
// }
