import User from "../models/users.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req, res) => {
  try {
    const data = req.body;

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Login failed: Incorrect password" });
    }

    const token = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id, 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
