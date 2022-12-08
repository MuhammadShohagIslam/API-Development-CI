"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCorrelationId = void 0;
const processCorrelationId = (req, res, next) => {
    let correlationId = req.headers["x-correlation-id"];
    if (!correlationId) {
        correlationId = `${Date.now()}`;
        req.headers["x-correlation-id"] = correlationId;
    }
    res.set({ "x-correlation-id": correlationId });
    return next();
};
exports.processCorrelationId = processCorrelationId;
