import Note from '../model/note.model'

export const ListNote = async (req, res) => {
  const folderId = req.params.folderId;
  if (!folderId) return res.status(404).json({ message: 'Không tìm thấy thư mục' });
  try {
    const notes = await Note.find({ folderId: folderId }).exec();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
}

export const AddNote = async (req, res) => {
  try {
    const notes = await Note(req.body).save()
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(404).json({ message: `${error}` });
  }
}

export const DeleteNotes = async (req, res) => {
  try {
    const notes = await Note.findOneAndDelete({ _id: req.params.id }).exec()
    return res.status(200).json({ notes, message: 'Xóa thành công' })
  } catch (error) {
    return res.status(400).json({ message: 'Xóa note không thành công' })
  }
}

export const NoteById = async (req, res) => {
  try {
    const notes = await Note.findOne({ _id: req.params.id }).exec()
    return res.status(200).json(notes)
  } catch (error) {
    return res.status(400).json({ message: 'Không thể hiện thị danh sách 1 ghi chú' })
  }
}

export const updateNote = async (req, res) => {
  try {
    const notes = await Note.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
    return res.status(200).json({ notes, message: 'Cập nhật thành công' })
  } catch (error) {
    return res.status(400).json({ message: 'Cập nhật không thành công' })
  }
}