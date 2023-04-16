import express from "express";

import { requireSignin } from "../middlewares/checkAuth";
import { userById } from "../controller/user.controller";
import { AddNote, DeleteNotes, ListNote, NoteById, updateNote } from "../controller/note.controller";

const noteRouters = express.Router();

noteRouters.get('/note/:folderId/', requireSignin, ListNote);
noteRouters.get('/note/detail/:id', requireSignin, NoteById);
noteRouters.post('/note/add', requireSignin, AddNote);
noteRouters.delete('/note/:id', requireSignin, DeleteNotes);
noteRouters.put('/note/:id', requireSignin, updateNote);

noteRouters.param('userId', userById);

export default noteRouters; 