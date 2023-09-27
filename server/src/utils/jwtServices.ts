// services/jwtService.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret'; // Always keep your secret key out of the codebase.

// Define the type for the user payload that will be stored in the JWT token
type UserPayload = {
    id:string; 
    username: string;
    userId: string;
    userEmail: string;
};

// Function to generate a token using the user payload
export const generateToken = (user: UserPayload): string => {
    return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // token expires in 1 hour
};

// Function to verify a token and return its decoded payload
export const verifyToken = (token: string): UserPayload => {
    return jwt.verify(token, SECRET_KEY) as UserPayload;
};

// List to store blacklisted tokens
const tokenBlacklist: string[] = [];

// Function to blacklist a token
export const blacklistToken = (token: string): void => {
    tokenBlacklist.push(token);
};

// Function to check if a token is blacklisted
export const isTokenBlacklisted = (token: string): boolean => {
    return tokenBlacklist.includes(token);
};

// Function to validate a token (check if it's blacklisted) and then verify it
export const validateAndVerifyToken = (token: string): UserPayload => {
    if (isTokenBlacklisted(token)) {
        throw new Error('This token is blacklisted.');
    }

    return verifyToken(token);
};
