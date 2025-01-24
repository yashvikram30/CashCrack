import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = String(process.env.JWT_SECRET);

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const verifiedUser = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.userId = verifiedUser.username; // ensure that you put only that value which you are signin the jwt with
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Token verification error" });
  }
}
