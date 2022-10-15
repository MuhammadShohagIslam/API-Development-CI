import express from "express";
import { json, urlencoded } from "body-parser";
import connectWithMongoDB from "./db/mongo";
import {
    createUserController,
    getAllUserController,
    getUserController,
    updateUserController,
} from "./controllers/user-controller";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

connectWithMongoDB();

app.post("/users", createUserController);
app.get("/users", getAllUserController);
app.get("/users/user/:id", getUserController);
app.put("/users/user/:id", updateUserController);

export default app;
