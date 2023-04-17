const mongoose = require('mongoose');

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
module.exports = mongoose.model('Note', noteSchema)