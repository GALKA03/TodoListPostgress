import { Request, Response } from "express";
import {
  loginUserService,
  logoutUserService,
  registerService,
} from "../services/authServices.js";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body;
    console.log(req.body);
    const result = await loginUserService(user_email, user_password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Login failed", error: error });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) {
      logoutUserService(token);
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      throw new Error("Token not provided");
    }
  } catch (error) {
    res.status(400).json({ message: "Logout failed", error: error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const createdUser = await registerService(userData);

    // Retrieve all the data values of the created user.
    const userResponse = { ...createdUser.get() };

    // Exclude password (assuming you have a password field) before sending it back.
    delete userResponse.password;

    res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error });
  }
};

