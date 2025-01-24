import { Router } from "express";
import { userRouter } from "./userRouter";
import { accountRouter } from "./accountRouter";
export const router = Router();

// defining the routes
router.use("/user",userRouter);
router.use("/account",accountRouter);