"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_validation_error_1 = require("../errors/request-validation-error");
const validateRequest = (validateSchema) => {
    return (req, res, next) => {
        const { error } = validateSchema.validate(req.body);
        if (error) {
            throw new request_validation_error_1.RequestValidationError(error);
        }
        next();
    };
};
exports.default = validateRequest;
