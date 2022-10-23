import express,{Request, Response} from "express";
import { json, urlencoded } from "body-parser";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import { successLogger } from "./config/logger";
import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";
import { processCorrelationId } from "./middlewares/process-correlation-id";

// import SwaggerDocument from './swagger.json';

const app = express();

app.use([json(), urlencoded({ extended: false })]);

app.use(processCorrelationId);


if (process.env.ENVIRONMENT != "TEST") {
    app.use(successLogger());
}

configureRoutes(app);



app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import("./swagger.json"))
    );
});
export default app;
