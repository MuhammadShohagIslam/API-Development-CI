import { Application } from "express";
import configureUserRoutes from "./user-controller";

const configureRoutes = (app: Application) => {
    configureUserRoutes(app);
};

export default configureRoutes;
