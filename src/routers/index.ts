import { Application } from "express";
import routers from "./routers";

const rootRouters = (app: Application) => {
    app.use("/api", routers);
};

export default rootRouters;
