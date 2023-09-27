import { validateAndVerifyToken } from './jwtServices.js';
import { Request, Response } from 'express';




export const validateHandler = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      throw new Error('Authorization header not provided');
    }

    // Bearer <token>
    const token = authorizationHeader.split(' ')[1]; // Extracting token from Bearer

    if (!token) {
      throw new Error('Token not provided');
    }

    const decodedToken = validateAndVerifyToken(token);

    if (!decodedToken.userId || !decodedToken.userEmail) {
      throw new Error('Invalid token contents');
    }

    
    res.status(200).json({ message: 'Token is valid', user: decodedToken });

  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error });
  }
};
