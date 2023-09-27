import { verifyToken, isTokenBlacklisted } from '../utils/jwtServices.js';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    if (isTokenBlacklisted(token))
        return res.sendStatus(401);
    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    }
    catch (err) {
        return res.sendStatus(403);
    }
};
//# sourceMappingURL=authMiddlware.js.map