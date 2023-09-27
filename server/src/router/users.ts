import express from "express";

import {
  deleteUser,
  getAllUsers,
  getUserId,
  updateUser,
} from "../controllers/users.js";
import { authenticateToken } from "../middlwares/authMiddlware.js";

export default (router: express.Router) => {
  router.get("/users", authenticateToken, getAllUsers);
  router.get("/users/:id", getUserId);
  router.delete("/users/:id", deleteUser);
  router.patch("/users/:id", updateUser);
};
