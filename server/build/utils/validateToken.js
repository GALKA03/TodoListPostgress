import { validateAndVerifyToken } from './jwtServices.js';
export const validateHandler = async (req, res) => {
    try {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            throw new Error('Authorization header not provided');
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token not provided');
        }
        const decodedToken = validateAndVerifyToken(token);
        if (!decodedToken.userId || !decodedToken.userEmail) {
            throw new Error('Invalid token contents');
        }
        res.status(200).json({ message: 'Token is valid', user: decodedToken });
    }
    catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error });
    }
};
//# sourceMappingURL=validateToken.js.map