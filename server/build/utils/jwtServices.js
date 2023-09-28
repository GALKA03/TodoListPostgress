import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'secret';
export const generateToken = (user) => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};
const tokenBlacklist = [];
export const blacklistToken = (token) => {
    tokenBlacklist.push(token);
};
export const isTokenBlacklisted = (token) => {
    return tokenBlacklist.includes(token);
};
export const validateAndVerifyToken = (token) => {
    if (isTokenBlacklisted(token)) {
        throw new Error('This token is blacklisted.');
    }
    return verifyToken(token);
};
//# sourceMappingURL=jwtServices.js.map