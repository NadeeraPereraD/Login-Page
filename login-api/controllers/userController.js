import User from "../models/users.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
dotenv.config();

export async function registerUser(req, res) {
  try {
    const data = req.body;

    const user = await User.findOne({ email: data.email });

    if (user) {
      return res.status(404).json({ error: "User already exist" });
    }

    data.password = bcrypt.hashSync(data.password, 10);

    const newUser = new User(data);

    await newUser.save();

    //res.status(201).json({ message: "User registered successfully" });

    const token = jwt.sign(
      {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "User registered successfully",
      token,
      user,
    });
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
      return res
        .status(401)
        .json({ error: "Login failed: Incorrect password" });
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

export const googleAuth = async (req, res) => {
  console.log("Google auth route hit!");
  try {
    const { authCode } = req.body;

    //Exchange auth code for tokens
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code: authCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { id_token } = tokenRes.data;

    //Verify id_token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const {
      sub: googleId,
      email,
      given_name: firstName,
      family_name: lastName,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(400).json({ error: "Google email not verified" });
    }

    //Check if user exists
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      user = new User({ googleId, firstName, lastName: lastName || "", email });
      await user.save();
      isNewUser = true;
      console.log("New google user created");
    }else {
      console.log("Existing user logging in");
      if(!user.googleId){
        user.googleId = googleId;
        await user.save();
      }
    }

    //Generate your JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    //Send response
    res.status(200).json({
      msg: isNewUser ? "Google signup success" : "Google login success",
      isNewUser,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Google auth error:", err.response?.data || err.message);
    res.status(400).json({ error: "Invalid Google token" });
  }
};

export const facebookAuth = async (req, res) => {
  console.log("Facebook signup route hit!");
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: "Access token is required" });
    }

    // Fetch user info from Facebook using /me endpoint (no userID needed)
    const fbRes = await axios.get(
      `https://graph.facebook.com/v17.0/me?fields=id,first_name,last_name,email&access_token=${accessToken}`
    );

    const {
      id: facebookId,
      email,
      first_name: firstName,
      last_name: lastName,
    } = fbRes.data;

    console.log("Facebook user data:", fbRes.data);

    if (!email) {
      return res.status(400).json({ error: "Facebook email not available" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      user = new User({
        facebookId,
        firstName,
        lastName: lastName || '',
        email,
      });
      await user.save();
      isNewUser = true;
      console.log("New Facebook user created");
    } else {
      console.log("Existing user logging in");
      if (!user.facebookId) {
        user.facebookId = facebookId;
        await user.save();
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: isNewUser ? "Facebook signup success" : "Facebook login success",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Facebook auth error:", err.response?.data || err.message);
    res
      .status(400)
      .json({
        error: "Invalid Facebook token or authentication failed",
        details: err.response?.data || err.message,
      });
  }
};
