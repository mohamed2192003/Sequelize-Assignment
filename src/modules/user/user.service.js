import { userModel } from "../../database/models/user.model.js";
import { userModel } from './../../database/models/user.model';
export const createUser = async (data) => {
  const { name, email, password, role } = data;
  const emailExist = await userModel.findOne({ where: { email } });
  if (emailExist) {
    throw new Error("Email already exists");
  }
  const user = userModel.build({ name, email, password, role });
  await user.save();
  return user;
};
export const updateUser = async (id, data) => {
  const result = await userModel.upsert(
    { id, ...data },
    { validate: false }
  );
  return result;
};
export const getUserByEmail = async (email) => {
  return await userModel.findOne({ where: { email } });
};
export const getUserById = async (id) => {
  return await userModel.findOne({where:{id}})
}