import User from "../model/user";

export const userById = async (req, res, next, id) => {
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: 'Không tìm thấy người dùng' })
  }
  req.profile = user;
  req.profile.password = undefined;

  next();
};