import express from "express";
import { json, urlencoded } from "body-parser";
import connectWithMongoDB from "./db/mongo";
import configureRoutes from "./controllers";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

configureRoutes(app);
connectWithMongoDB();

export default app;
