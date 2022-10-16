import { CustomError } from "./custom-error";
import { ValidationError } from "joi";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public error: ValidationError) {
        super("Invalid Credential");

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        const { message, path } = this.error.details[0];

        return [
            {
                message: message.split('"').join(""),
                path: path[0],
                statusCode: this.statusCode,
            },
        ];
    }
}
