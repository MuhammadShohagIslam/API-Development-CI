import express, { Request, Response, NextFunction } from "express";
import { validateRequest } from "../middlewares/request-validate";
import { userSchema } from "../models/request-validation-models";
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
        res.status(200).json(removed);
    } catch (error) {
        next(error);
    }
};

router.post("/", validateRequest(userSchema), createUserHandler);
router.get("/", getAllUserHandler);
router.get("/:id", getUserHandler);
router.patch("/:id", validateRequest(userSchema), updateUserHandler);
router.delete("/:id", removeUserHandler);

export { router as userRouter };
