const mongoose = require('mongoose');

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
module.exports = mongoose.model('Folder', folderSchema)