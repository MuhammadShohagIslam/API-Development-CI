import express from "express";
import { json, urlencoded } from "body-parser";
import configureRoutes from "./controllers";
import errorHandler from "./middlewares/error-handler";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

configureRoutes(app);

app.use(errorHandler);

export default app;
