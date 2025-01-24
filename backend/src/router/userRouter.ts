import { Router } from "express";
export const userRouter = Router();
import { z } from "zod";
import { User } from "../db/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);

const signupSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(6),
  username: z.string().min(3).max(30),
});

const signinSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
})

userRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const verifiedUser = signupSchema.safeParse(req.body);

    if (!verifiedUser.success) {
      res.json({
        Message:
          "Invalid signup schema, minimum password length is 6, username length is between 3 and 30",
      });
      return;
    }

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      res.status(411).json({
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: username,
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "User created!",
      token: token,
    });
  } catch (e: unknown) {
    console.error("Signup error:", e);
    res.status(500).json({
      message: "Internal server error occurred",
    });
  }

  userRouter.post("/signin", async (req, res) => {
    try {
      const { username, password } = req.body;

      const verifiedUser = signinSchema.safeParse(req.body);
      if(!verifiedUser.success){
        res.status(411).json({
          message: "Invalid schema"
        })
        return;
      }

      const user = await User.findOne({
        username,
      });
      if (!user) {
        res.status(403).json({
          message: "User not found, invalid username",
        });
        return;
      }

      const validUser = bcrypt.compare(password, user.password);

      if (!validUser) {
        res.status(403).json({
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        {
          username,
        },
        JWT_SECRET
      );

      res.status(200).json({
        message: "Logged in successfully",
        token: token,
      });
    } catch (e: unknown) {
      console.error(e); // Logs the actual error
      res.status(411).json({
        message: "Error during sign-in. Please try again later.",
      });
    }
  });
});
