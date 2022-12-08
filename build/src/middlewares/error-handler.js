"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    const correlationId = req.headers["x-correlation-id"];
    if (err instanceof custom_error_1.CustomError) {
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeError(correlationId) });
    }
    return res.status(500).send({
        errors: [
            {
                correlationId: correlationId,
                message: "Something Went Wrong!",
                statusCode: 500,
            },
        ],
    });
};
exports.default = errorHandler;
