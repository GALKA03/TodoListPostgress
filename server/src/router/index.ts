import express from "express";
import authentication from "./authentication.js";
import users from "./users.js";
import tasksRouter from "./tasksRouter.js";

const router = express.Router();

export default (): express.Router => {
  authentication(router);

  users(router);

  tasksRouter(router);
  return router;
};
