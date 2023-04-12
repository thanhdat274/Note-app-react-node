import express from "express";
import { AddFolder, ListFolder } from "../controller/folder.controller";
import { requireSignin } from "../middlewares/checkAuth";
import { userById } from "../controller/user.controller";

const folderRouter = express.Router();
folderRouter.get('/folder/:userId', requireSignin, ListFolder);
folderRouter.post('/folder/:userId', requireSignin, AddFolder);
folderRouter.param('userId', userById);

export default folderRouter; 