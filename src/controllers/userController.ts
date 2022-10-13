import express, { Request, Response } from "express";
import models from "../models";

const app = express();
// logger
const log = (msg: any) => console.log(msg);

const getUser = (req: Request, res: Response) => {
    const a = models.User.build({ username: "good", email: "a" });
    res.end("hfskf");
};

const postUser = (req: Request, res: Response) => {
    const a = models.User.build({
        username: req.body.username,
        email: req.body.email,
    });
    a.save((error, doc) => {
        if (error) {
            console.error(error);
        }
        log(doc);
        res.status(200).json(doc);
    });
};

app.get("/", getUser);
app.post("/", postUser);
