export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeError(correlationId: string | string[]): {
        correlationId: string | string[];
        message: string;
        statusCode: number;
        path?: string | number;
    }[];
}
