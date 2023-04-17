const express = require("express");
import { signin, signup } from "../controller/auth";

const userRouter = express.Router();
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
module.exports = userRouter;