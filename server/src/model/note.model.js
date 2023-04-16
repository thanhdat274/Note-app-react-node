import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  folderId: {
    type: mongoose.ObjectId,
    ref: 'Folder',
  }

}, { timestamps: true });
export default mongoose.model('Note', noteSchema)