import User from "../models/users.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export async function registerUser(req, res) {
  try {
    const data = req.body;

    data.password = bcrypt.hashSync(data.password, 10);

    const newUser = new User(data);

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ error: "User registration failed" });
  }
}
