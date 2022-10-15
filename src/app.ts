import express from "express";
import { json, urlencoded } from "body-parser";
import connectWithMongoDB from "./db/mongo";
import {
    createUserController,
    getAllUserController,
} from "./controllers/user-controller";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

connectWithMongoDB();

app.get("/", getAllUserController);
app.post("/", createUserController);

export default app;
