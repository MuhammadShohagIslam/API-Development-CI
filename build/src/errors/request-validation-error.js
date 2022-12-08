"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(error) {
        super("Invalid Credential");
        this.error = error;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError(correlationId) {
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
exports.RequestValidationError = RequestValidationError;
