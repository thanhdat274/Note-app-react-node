import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  authId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },

}, { timestamps: true });
export default mongoose.model('Folder', folderSchema)