import express from "express";
import { ListFolder } from "../controller/folder.controller";
import { requireSignin } from "../middlewares/checkAuth";
import { userById } from "../controller/user.controller";

const folderRouter = express.Router();
folderRouter.get('/folder/:userId', ListFolder);
// folderRouter.param('userId', userById);

export default folderRouter; 