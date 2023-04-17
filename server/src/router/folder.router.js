import express from "express";
import { AddFolder, DeleteFolder, FolderById, ListFolder, updateFolders } from "../controller/folder.controller";
import { requireSignin } from "../middlewares/checkAuth";
import { userById } from "../controller/user.controller";

const folderRouter = express.Router();

folderRouter.get('/folder/:userId', requireSignin, ListFolder);
folderRouter.get('/folder/detail/:id', requireSignin, FolderById);
folderRouter.post('/folder/:userId', requireSignin, AddFolder);
folderRouter.delete('/folder/:id', requireSignin, DeleteFolder);
folderRouter.put('/folder/:id', requireSignin, updateFolders);

folderRouter.param('userId', userById);

module.exports = folderRouter; 