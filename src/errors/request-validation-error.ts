import { CustomError } from "./custom-error";
import { ValidationError } from "joi";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public error: ValidationError) {
        super("Invalid Credential");

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError(correlationId: string | string[]) {
        const { message, path } = this.error.details[0];

        return [
            {
                correlationId: correlationId,
                message: message.split('"').join(""),
                path: path[0],
                statusCode: this.statusCode,
            },
        ];
    }
}
