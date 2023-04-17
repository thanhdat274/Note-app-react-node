const express = require('express');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import 'dotenv/config';
const userRouter = require('./src/router/auth');
const folderRouter = require('./src/router/folder.router');
const noteRouters = require('./src/router/notes.router');

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;
// Connect to DB
const URI = process.env.MONGODB_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'))
app.use('/api', userRouter)
app.use('/api', folderRouter)
app.use('/api', noteRouters)

mongoose.set('strictQuery', false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to DB');
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });