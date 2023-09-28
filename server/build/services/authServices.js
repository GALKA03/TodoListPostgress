import User from "../models/userModel.js";
import { generateToken, blacklistToken, } from "../utils/jwtServices.js";
export const loginUserService = async (user_email, user_password) => {
    const user = await User.findOne({ where: { user_email } });
    if (!user)
        throw new Error("User not found");
    const isMatch = await user.verifyPassword(user_password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = generateToken({
        id: user.user_id,
        username: user.user_name,
        userId: user.user_id,
        userEmail: user.user_email
    });
    return {
        token,
        user_name: user.user_name,
        user_email: user.user_email
    };
};
export const logoutUserService = (token) => {
    blacklistToken(token);
};
export const registerService = (data) => User.create(data);
//# sourceMappingURL=authServices.js.map