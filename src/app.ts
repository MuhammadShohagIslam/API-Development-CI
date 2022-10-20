import { json, urlencoded } from "body-parser";
import express from "express";
import "dotenv/config";
import { errorLogger } from "./config/logger";
import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";
import { url } from "./db/mongo";

const app = express();

app.use([json(), urlencoded({ extended: false })]);

app.use(processCorrelationId);

configureRoutes(app);

if (process.env.ENVIRONMENT != "TEST") {
    app.use(errorLogger(url));
}

app.use(errorHandler);

export default app;
