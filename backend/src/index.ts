import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { router } from "./router";
import cors from "cors";
import jwt from 'jsonwebtoken';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// importing env files
const url = String(process.env.MONGO_URL);
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const secret = String(process.env.JWT_SECRET);

// defining the routes
app.use('/api/v1',router);

// connecting and launching the server
main();

async function main() {
  try {
    await mongoose.connect(url);
    app.listen(port, () => {
      console.log("Server connected!");
    });
  } catch (e) {
    console.log("Unexpected error occurred: ", e);
  }
}
