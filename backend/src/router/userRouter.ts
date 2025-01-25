import { Router } from "express";
export const userRouter = Router();
import { z } from "zod";
import { User } from "../db/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Account } from "../db/bankModel";

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
});

const updateSchema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(6),
});

const bulkSchema = z.object({
  filter: z.string(),
});

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

    const accountBalance = await Account.create({
      userId: user._id,
      balance: Math.floor(Math.random() * 10000) + 1,
    })

    res.status(200).json({
      user: user.username,
      balance: accountBalance.balance
    });
  } catch (e: unknown) {
    console.error("Signup error:", e);
    res.status(500).json({
      message: "Internal server error occurred",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const verifiedUser = signinSchema.safeParse(req.body);
    if (!verifiedUser.success) {
      res.status(411).json({
        message: "Invalid schema",
      });
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

userRouter.get("/details",authMiddleware, async(req,res)=>{
  try{
    // @ts-ignore
    const username = req.userId;
    const user = await User.findOne({
      username
    })

    if(!user){
      res.json({
        message: "User not found"
      })
      return;
    }

    res.json({

      objectId : user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    })

  }catch (e) {
    console.log("error occurred: ", e);
    res.json({
      message: "Error occurred",
    });
  }
})

userRouter.put("/update", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;

    const validateUser = updateSchema.safeParse({
      firstName,
      lastName,
      password,
    });
    if (!validateUser.success) {
      res.json({
        message: "Wrong format",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.updateOne(
      //@ts-ignore
      { username: req.userId }, // ensure that you put here only what you are signing the jwt with
      {
        $set: {
          // Use $set to ensure partial updates work correctly
          firstName,
          lastName,
          password: hashedPassword, // or hashedPassword depending on your schema
        },
      },
      { runValidators: true } // This will run schema validations
    );

    res.json({
      message: "User successfully updated",
    });
  } catch (e) {
    console.log("error occurred: ", e);
    res.json({
      message: "Error occurred",
    });
  }
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const { filter } = req.query;
  
  const validData = bulkSchema.safeParse({ filter });
  if (!validData.success) {
    res.json({
      message: "name should be a string",
    });
    return;
  }

  // basically $or implies that either of the given conditions should be true
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter, //$regex search for the string based on the case-sensitivity
          $options: "i" // this is used to make the search case insensitive
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i"
        },
      },
    ],
  });

  // return the user here by mapping the individual user and then returning all their data
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    })),
  });
});
