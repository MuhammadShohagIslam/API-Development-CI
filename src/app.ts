import { json, urlencoded } from "body-parser";
import express from "express";
import { successLogger, errorLogger } from "./config/logger";

import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";

const app = express();

app.use([json(), urlencoded({ extended: false })]);

app.use(successLogger);
app.use(processCorrelationId);

configureRoutes(app);

app.use(errorLogger);
app.use(errorHandler);

export default app;
