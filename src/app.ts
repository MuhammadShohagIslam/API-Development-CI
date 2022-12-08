import express from "express";
import path from 'path';
import { json, urlencoded } from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger.json';
import "dotenv/config";
import { successLogger, errorLogger } from "./config/logger.config";
import errorHandler from "./middlewares/error-handler";
import rootRouters from "./routers";
import { processCorrelationId } from "./middlewares/process-correlation-id";
import "./services/cache";

const app = express();

const options = { customCssUrl: '/public/swagger-ui.css', customSiteTitle: "Blog API - Swagger" };

app.use([json(), urlencoded({ extended: false }), cors()]);

app.use(processCorrelationId);

if (process.env.ENVIRONMENT != "TEST") {
    app.use(successLogger());
}

rootRouters(app);

if (process.env.ENVIRONMENT != "TEST") {
    app.use(errorLogger());
}

app.use(errorHandler);

app.use(express.static('public'))
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument, options));


export default app;
