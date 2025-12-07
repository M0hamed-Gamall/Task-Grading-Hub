import User from "../models/user.model.js"
import AppError from "../utils/appError.js";

const getUser = async (id: string) => {
  const user = await User.findById(id).select("-password -__v");
  if (!user) {
    throw new AppError("User Not Found", 400, "fail");
  }
  return user;
}

export default{ getUser }