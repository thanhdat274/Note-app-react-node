const express = require("express");

const { requireSignin } = require("../middlewares/checkAuth");
const { userById } = require("../controller/user.controller");
const { AddNote, DeleteNotes, ListNote, NoteById, updateNote } = require("../controller/note.controller");

const noteRouters = express.Router();

noteRouters.get('/note/:folderId/', requireSignin, ListNote);
noteRouters.get('/note/detail/:id', requireSignin, NoteById);
noteRouters.post('/note/add', requireSignin, AddNote);
noteRouters.delete('/note/:id', requireSignin, DeleteNotes);
noteRouters.put('/note/:id', requireSignin, updateNote);

noteRouters.param('userId', userById);

module.exports = noteRouters; 