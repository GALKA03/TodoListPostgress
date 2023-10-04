import express from "express";
import {
  createNewTask,
  getTasks,
  getTaskId,
  deleteTask,
  updateTask,
} from "../controllers/tasks.js";
import { validateHandler } from "../utils/validateToken.js";


export default (router: express.Router) => {
  // Apply the validateHandler middleware to all routes defined below this line
  router.use(validateHandler);

  router.post("/tasks/", createNewTask);
  router.get("/tasks/", getTasks);
  router.get("/tasks/:id", getTaskId);
  router.delete("/tasks/:id", deleteTask);
  router.put("/tasks/:id", updateTask);
};
