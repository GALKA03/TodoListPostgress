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

export const loginUserService = async ({
  user_email,
  user_password
}: {
  user_email: string;
  user_password: string;
}): Promise<{ token: string; user_email: string; hashed_password: string }> => {
  const user = await User.findOne({ where: { user_email } });
  if (!user) throw new Error("User not found");
console.log('user', user)
  const isMatch = await user.verifyPassword(user_password);
  if (!isMatch) throw new Error("Invalid credentials");
console.log('isMatch', isMatch)
  const token = generateToken({
    id: user.user_id,
    username: user.user_name,
    userEmail: user.user_email 
  });

  return {
    token,
    user_email: user.user_email,
    hashed_password: user.user_password  
  };
};


export const logoutUserService = (token: string) => {
  // If you have a mechanism to blacklist tokens, do it here.
  blacklistToken(token);
};

export const registerService = (data: Partial<UserRegistrationData>) => User.create(data);