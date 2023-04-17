const Folder = require('../model/folder.model');

exports.AddFolder = async (req, res) => {
  const userID = req.profile._id;
  if (!userID) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  try {
    const folders = await Folder(req.body).save()
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(400).json({ message: 'Thêm mới không thành công' })
  }
}

exports.ListFolder = async (req, res) => {
  const userID = req.profile._id;
  if (!userID) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  try {
    const folders = await Folder.find({ authId: userID }).exec();
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
};

exports.FolderById = async (req, res) => {
  try {
    const folders = await Folder.findOne({ _id: req.params.id }).exec()
    return res.status(200).json(folders)
  } catch (error) {
    return res.status(400).json({ message: 'Không thể hiện thị danh sách 1 thư mục' })
  }
}

exports.DeleteFolder = async (req, res) => {
  try {
    const folders = await Folder.findOneAndDelete({ _id: req.params.id }).exec()
    return res.status(200).json({ folders, message: 'Xóa thành công' })
  } catch (error) {
    return res.status(400).json({ message: 'Xóa thư mục không thành công' })
  }
}

exports.updateFolders = async (req, res) => {
  try {
    const folders = await Folder.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
    return res.status(200).json({ folders, message: 'Cập nhật thành công' })
  } catch (error) {
    return res.status(400).json({ message: 'Cập nhật không thành công' })
  }
}