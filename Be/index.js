// Import packages
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');

const home = require("./src/routes/home");
require('dotenv').config();
const URI = process.env.MONGODB_URL;
// Middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/", home);

mongoose.connect(URI)
  .then(() => console.log("Kết nối với Database thành công"))
  .catch(err => console.log("Kết nối với Database không thành công"))
// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
