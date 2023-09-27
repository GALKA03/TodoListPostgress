// services/authService.ts

import User from "../models/userModel.js";
import {
  generateToken,
  blacklistToken,
} from "../utils/jwtServices.js";

type UserRegistrationData = {
  user_email: string;
  user_password: string;
  user_name: string;
  // add other fields as needed
};

export const loginUserService = async (
  user_email: string,
  user_password: string
): Promise<{ token: string, user_name: string, user_email: string }> => {
  const user = await User.findOne({ where: { user_email } });
  if (!user) throw new Error("User not found");

  const isMatch = await user.verifyPassword(user_password);
  if (!isMatch) throw new Error("Invalid credentials");

const token = generateToken({
  id: user.user_id,           // Assuming user_id in User is the unique identifier
  username: user.user_name,   // Using user_name from the User model
  userId: user.user_id, 
  userEmail: user.user_email 
});


  return {
    token,
    user_name: user.user_name, // Assuming user_name is the column in your database for user's name
    user_email: user.user_email
  };
};

export const logoutUserService = (token: string) => {
  // If you have a mechanism to blacklist tokens, do it here.
  blacklistToken(token);
};

export const registerService = (data: Partial<UserRegistrationData>) => User.create(data);