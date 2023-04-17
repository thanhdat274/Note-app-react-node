const express = require("express");
const userRouter = express.Router();
const { signin, signup } = require("../controller/auth.controller");

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
module.exports = userRouter;