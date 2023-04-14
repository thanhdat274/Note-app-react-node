import express from "express";

import { requireSignin } from "../middlewares/checkAuth";
import { userById } from "../controller/user.controller";
import { ListNote } from "../controller/note.controller";

const noteRouters = express.Router();

noteRouters.get('/note/:folderId/', requireSignin, ListNote);
noteRouters.get('/note/detail/:id', requireSignin,);
noteRouters.post('/note/:userId', requireSignin,);
noteRouters.delete('/note/:id', requireSignin,);
noteRouters.put('/note/:id', requireSignin,);

noteRouters.param('userId', userById);

export default noteRouters; 