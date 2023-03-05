import { json, urlencoded } from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import * as fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import "./caching/cache.v2";
import { errorLogger, successLogger } from "./config/logger.config";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";
import swaggerDocument from "./swagger.json";
import rootRouters from "./routers";


const app = express();
const ROOT_FOLDER = path.join(__dirname, "..");
const SRC_FOLDER = path.join(ROOT_FOLDER, "src");

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


if (swaggerDocument && swaggerDocument.host) {
    swaggerDocument.host = process.env.SWAGGER_HOST || "";
}

if (swaggerDocument && swaggerDocument.schemes) {
    swaggerDocument.schemes[0] = process.env.SWAGGER_SCHEMES || "";
}


fs.writeFile(
    "./swagger.json",
    JSON.stringify(swaggerDocument, null, 2),
    function writeJSON(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Updated Swagger.json");
    }
);

const options = {
    customCssUrl: "/public/swagger-ui.css",
    customSiteTitle: "Blog API - Swagger",
    persistAuthorization: true
};

app.use("/public", express.static(path.join(SRC_FOLDER, "public")));
app.use("/", swaggerUi.serve);
app.get("/", swaggerUi.setup(swaggerDocument, options));

export default app;
