import express, { Request, Response } from "express";
import { createUserService, getAllUserService } from "../services/user-service";

// logger
const log = (msg: any) => console.log(msg);

const getAllUserController = async (req: Request, res: Response) => {
    const users = await getAllUserService();
    res.status(200).json(users);
};

const createUserController = async (req: Request, res: Response) => {
    log(req.body);
    const newUser = await createUserService(req.body);

    res.status(201).json(newUser);
};

export { getAllUserController, createUserController };
