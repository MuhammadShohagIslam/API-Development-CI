import { json, urlencoded } from "body-parser";
import express from "express";
import 'dotenv/config'
import { successLogger, errorLogger } from "./config/logger";
import connectWithMongoDB from "./db/mongo";
import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";

console.log(process.env.ENVIRONMENT != "TEST")

const app = express();

app.use([json(), urlencoded({ extended: false })]);

app.use(processCorrelationId);
connectWithMongoDB();

if(process.env.ENVIRONMENT != "TEST"){
    console.log("test", "ENVIRONMENT");
    app.use(successLogger);
}

configureRoutes(app);


if(process.env.ENVIRONMENT != "TEST"){
    app.use(errorLogger);
}
app.use(errorHandler);

export default app;
