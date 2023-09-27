import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authentication.js';
import validateRequest from '../middlwares/validateJoi.js';
import { loginSchema, registrationSchema } from '../utils/validateAuth.js';



export default (router: express.Router) => {
  router.post('/auth/register', validateRequest({ schema: registrationSchema, requestPart: 'body' }), registerUser);
  router.post('/auth/login', validateRequest({ schema: loginSchema, requestPart: 'body' }), loginUser);

  //  router.post("/auth/register", registerUser);
  //  router.post("/auth/login", loginUser);
  router.post('/auth/logout', logoutUser);
};
