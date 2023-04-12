import Folder from '../model/folder.model';

export const AddFolder = async (req, res) => {
  const userID = req.profile._id;
  if (!userID) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  try {
    const folders = await Folder(req.body).save()
    return res.status(200).json(folders);
  } catch (error) {
    res.status(400).json({ message: 'Thêm mới không thành công' })
  }
}
export const ListFolder = async (req, res) => {
  const userID = req.profile._id;
  if (!userID) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  try {
    const folders = await Folder.find({ authId: userID }).exec();
    return res.status(200).json(folders);
  } catch (error) {
    res.status(404).json({ message: `${error}` });
  }
};
