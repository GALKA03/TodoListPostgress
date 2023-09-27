 import Joi  from 'joi';



 export const registrationSchema = Joi.object({
  user_name: Joi.string()
    .min(2)
    .max(15)
    .required(),
  user_email: Joi.string()
    .email()
    .required(),
  user_password: Joi.string()
    .min(6)
    .max(10)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .required(),
});

export const loginSchema = Joi.object({
  user_email: Joi.string()
    .email()
    .required(),
  user_password: Joi.string()
    .min(6)
    .max(10)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .required(),
});
