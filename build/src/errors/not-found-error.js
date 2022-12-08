"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.message = message;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeError(correlationId) {
        return [
            {
                correlationId: correlationId,
                message: this.message,
                statusCode: this.statusCode,
            },
        ];
    }
}
exports.NotFoundError = NotFoundError;
