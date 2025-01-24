import { Router } from "express";
import { userRouter } from "./userRouter";
export const router = Router();

// defining the routes
router.use("/user",userRouter);