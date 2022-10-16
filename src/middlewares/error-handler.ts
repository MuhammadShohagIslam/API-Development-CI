import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const correlationId = req.headers["x-correlation-id"];

    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeError(correlationId!) });
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

export default errorHandler;
