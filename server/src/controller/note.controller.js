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