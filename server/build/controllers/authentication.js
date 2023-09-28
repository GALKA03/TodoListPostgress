import { loginUserService, logoutUserService, registerService, } from "../services/authServices.js";
export const loginUser = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        console.log(req.body);
        const result = await loginUserService(user_email, user_password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: "Login failed", error: error });
    }
};
export const logoutUser = (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            logoutUserService(token);
            res.status(200).json({ message: "Logged out successfully" });
        }
        else {
            throw new Error("Token not provided");
        }
    }
    catch (error) {
        res.status(400).json({ message: "Logout failed", error: error });
    }
};
export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const createdUser = await registerService(userData);
        const { ...userResponse } = createdUser.getDataValue;
        res
            .status(201)
            .json({ message: "User registered successfully", user: userResponse });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Registration failed", error: error });
    }
};
//# sourceMappingURL=authentication.js.map