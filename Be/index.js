// Import packages
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const home = require("./src/routes/home");
const userRouter = require('./src/routes/auth.router');
const folderRouter = require('./src/routes/folder.router');
const noteRouters = require('./src/routes/notes.router');
const bodyParser = require('body-parser');

require('dotenv').config();
const URI = process.env.MONGODB_URL;
// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/", home);
app.use('/api', userRouter)
app.use('/api', folderRouter)
app.use('/api', noteRouters)

mongoose.connect(URI)
  .then(() => console.log("Kết nối với Database thành công"))
  .catch(err => console.log("Kết nối với Database không thành công"))
// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
