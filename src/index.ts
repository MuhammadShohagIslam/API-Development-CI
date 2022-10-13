import express from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import User from "./models/user";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

// logger
const log = (msg:any) => console.log(msg);

//connection mongoDB
const url = "mongodb://127.0.0.1:27017/blogAPI";
const options = {};
function connectWithDB() {
    mongoose.connect(url, options, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log("MongoDB is connected successfully!");
        }
    });
}

connectWithDB();

app.get("/", (req, res) => {
    const a = User.build({ username: "good", email: "a" });
    res.end("hfskf");
});

app.post("/", (req, res) => {
    const a = User.build({
        username: req.body.username,
        email: req.body.email,
    });
    a.save((error, doc) => {
        if (error) {
            console.error(error);
        }
        log(doc)
        res.status(200).json(doc);
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
