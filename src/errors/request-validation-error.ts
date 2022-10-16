import { CustomError } from "./custom-error";
import { ValidationError } from "joi";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public error: ValidationError) {
        super("Invalid Credential");

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeError() {
        return [
            {
                message: this.error.details[0].message.split('"').join(""),
                path: this.error.details[0].path[0],
                statusCode: this.statusCode,
            },
        ];
    }
}
