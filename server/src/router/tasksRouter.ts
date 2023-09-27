import express from "express";
import {
  createNewTask,
  getTasks,
  getTaskId,
  deleteTask,
  updateTask,
} from "../controllers/tasks.js";


export default (router: express.Router) => {
  router.post("/tasks/", createNewTask);
  router.get("/tasks/", getTasks);
  router.get("/tasks/:id", getTaskId);
  router.delete("/tasks/:id", deleteTask);
  router.put("/tasks/:id", updateTask);
};
