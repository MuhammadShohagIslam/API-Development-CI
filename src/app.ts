import { json, urlencoded } from "body-parser";
import express from "express";
import { successLogger, errorLogger } from "./config/Logger";

import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

app.use(processCorrelationId);
app.use(successLogger);

configureRoutes(app);

app.use(errorLogger);
app.use(errorHandler);

export default app;
