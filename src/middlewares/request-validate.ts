import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { RequestValidationError } from "../errors/request-validation-error";

const validateRequest = (validateSchema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = validateSchema.validate(req.body);

        if (error) {
            throw new RequestValidationError(error);
        }
        next();
    };
};

export default validateRequest;
