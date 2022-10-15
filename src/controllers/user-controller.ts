import express, { Request, Response, Application, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import userSchema from "../models/model_validation/user";
import {
    createUserService,
    getAllUserService,
    getUserService,
    removeUserService,
    updateUserService,
} from "../services/user-service";

const router = express.Router();

// logger
const log = (msg: any) => console.log(msg);

const createUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            throw new BadRequestError(`${error}`);
        }
        const newUser = await createUserService(req.body);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getAllUserHandler = async (req: Request, res: Response) => {
    const users = await getAllUserService();
    res.status(200).json(users);
};

const getUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const user = await getUserService(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);
    res.status(201).json(updatedUser);
};

const removeUserHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const removed = await removeUserService(id);
        res.status(204).json(removed);
    } catch (error) {
        next(error);
    }
};

router.post("/", createUserHandler);
router.get("/", getAllUserHandler);
router.get("/:id", getUserHandler);
router.patch("/:id", updateUserHandler);
router.delete("/:id", removeUserHandler);

const configureUserRoutes = (app: Application) => {
    app.use("/users", router);
};

export default configureUserRoutes;
