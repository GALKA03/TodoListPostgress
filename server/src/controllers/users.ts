import {
  deleteUserById,
  getUserById,
  getAllUsersService,
  updateUserById,
} from "../services/userService.js";
import { Request, Response } from "express";

type UserParams = {
  id?: string;  // Optional id, since it's not present in all request bodies
  username?: string; // Optional username, for the update function
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch users." });
  }
};

export const getUserId = async (req: Request<UserParams>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id!);  // Using '!' as we're sure id exists here
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch user." });
  }
};

export const deleteUser = async (req: Request<UserParams>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id!);  // Using '!' as we're sure id exists here
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete user." });
  }
};

export const updateUser = async (
  req: Request<UserParams>,
  res: Response
) => {
  try {
    const { id, username } = req.body; // Assuming id is also in the body here for simplicity

    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    const updatedUser = await updateUserById(id!, { username });  // Using '!' as we're sure id exists here

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update user." });
  }
};
