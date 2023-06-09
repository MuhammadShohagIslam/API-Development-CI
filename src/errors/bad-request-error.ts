import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message: string) {
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(correlationId: string | string[]) {
        return [
            {
                correlationId: correlationId,
                message: this.message,
                statusCode: this.statusCode,
            },
        ];
    }
}
