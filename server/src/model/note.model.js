import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  content: {
    type: String,
  },
  folderId: {
    type: mongoose.ObjectId,
    ref: 'Folder',
  }

}, { timestamps: true });
export default mongoose.model('Note', noteSchema)