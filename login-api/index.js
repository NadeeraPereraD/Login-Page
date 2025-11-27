import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});