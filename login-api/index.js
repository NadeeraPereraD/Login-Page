import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});

app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});