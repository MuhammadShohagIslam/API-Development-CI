import express from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import { json, urlencoded } from "body-parser";
import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

// // setup winston
// const loggerOptions: expressWinston.LoggerOptions = {
//     transports: [new winston.transports.Console()],
//     format: winston.format.combine(
//         winston.format.json(),
//         winston.format.prettyPrint(),
//         winston.format.colorize({ all: true })
//     ),
// };

// // initialize the logger with the above configuration
// app.use(expressWinston.logger(loggerOptions));

app.use(processCorrelationId);
configureRoutes(app);
app.use(errorHandler);

export default app;
