import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
type ValidationOptions = {
  schema: Joi.ObjectSchema;
  requestPart: 'body' | 'query' | 'params';
};
 const validateRequest = ({ schema, requestPart }: ValidationOptions) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[requestPart]);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        next();
    };
};
export default validateRequest