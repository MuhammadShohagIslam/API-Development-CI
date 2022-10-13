import express from "express";
import { json, urlencoded } from "body-parser";
import connectWithMongoDB from "./db/mongo";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);


connectWithMongoDB();

export default app;