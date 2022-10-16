import { Request, Response, NextFunction } from "express";

export const processCorrelationId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let correlationId = req.headers["x-correlation-id"];
    console.log(correlationId);
    if (!correlationId) {
        correlationId = `${Date.now()}`;
        req.headers["x-correlation-id"] = correlationId;
    }

    res.set({ "x-correlation-id": correlationId });

    return next();
};
