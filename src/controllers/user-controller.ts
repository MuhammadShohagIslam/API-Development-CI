import { Request, Response } from "express";
import {
    createUserService,
    getAllUserService,
    getUserService,
} from "../services/user-service";

// logger
const log = (msg: any) => console.log(msg);

const getAllUserController = async (req: Request, res: Response) => {
    const users = await getAllUserService();
    res.status(200).json(users);
};

const getUserController = async (req: Request, res: Response) => {
    const {id} = req.params;
    log(id);
    const user = await getUserService(id);
    res.status(200).json(user);
};

const createUserController = async (req: Request, res: Response) => {
    log(req.body);
    const newUser = await createUserService(req.body);

    res.status(201).json(newUser);
};

export { getAllUserController, createUserController, getUserController };
