import Folder from '../model/folder.model';

export const ListFolder = async (req, res) => {
  const userID = req.params.userId;
  if (!userID) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  try {
    const folders = await Folder.find({ authId: userID }).populate("authId").exec();
    return res.status(200).json(folders);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};
