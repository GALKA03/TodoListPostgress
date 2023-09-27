// import  UserModel  from '../models/userModel'; // import your Sequelize user model
import User from "../models/userModel.js";

export const getAllUsersService = () => User.findAll();

export const getUserById = (id: string) => User.findByPk(id);

export const deleteUserById = (id: string) =>
  User.destroy({
    where: { id },
  });

export const updateUserById = async (
  id: string,
  updateData: Record<string, string>
) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  const updatedUser = await user.update(updateData);
  return updatedUser;
};
