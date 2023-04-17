const express = require("express");
const folderRouter = express.Router();
const { AddFolder, DeleteFolder, FolderById, ListFolder, updateFolders } = require("../controller/folder.controller");
const { requireSignin } = require("../middlewares/checkAuth");
const { userById } = require("../controller/user.controller");

folderRouter.get('/folder/:userId', requireSignin, ListFolder);
folderRouter.get('/folder/detail/:id', requireSignin, FolderById);
folderRouter.post('/folder/:userId', requireSignin, AddFolder);
folderRouter.delete('/folder/:id', requireSignin, DeleteFolder);
folderRouter.put('/folder/:id', requireSignin, updateFolders);

folderRouter.param('userId', userById);

module.exports = folderRouter; 