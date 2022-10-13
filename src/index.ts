import express from "express";
import { json, urlencoded } from "body-parser";
import User from "./models/user";

const app = express();

// third-party middleware
app.use([json(), urlencoded({ extended: false })]);

app.get("/", (req, res) => {
    const a = User.build({username:"good", email: "a"})
    res.end("hfskf");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
