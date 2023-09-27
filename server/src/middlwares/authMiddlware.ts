
import { verifyToken, isTokenBlacklisted } from '../utils/jwtServices.js';
import { Request as ExpressRequest, Response, NextFunction } from 'express';

type UserPayload = {
    id?: string;  // made optional with '?'
    username?: string;  // made optional with '?'
    userId: string;
    userEmail: string;
};

interface ExtendedRequest extends ExpressRequest {
    user?: UserPayload; // Updated from any to UserPayload for stronger typing
}

export const authenticateToken = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // if there isn't any token

    if (isTokenBlacklisted(token)) return res.sendStatus(401); // if token is blacklisted

    try {
        const user: UserPayload = verifyToken(token); // Type it as UserPayload
        req.user = user; 
        next();
    } catch (err) {
        return res.sendStatus(403); // if token is invalid
    }
};