import User from "../models/userModel.js";
export const getAllUsersService = () => User.findAll();
export const getUserById = (id) => User.findByPk(id);
export const deleteUserById = (id) => User.destroy({
    where: { id },
});
export const updateUserById = async (id, updateData) => {
    const user = await User.findByPk(id);
    if (!user)
        return null;
    const updatedUser = await user.update(updateData);
    return updatedUser;
};
//# sourceMappingURL=userService.js.map