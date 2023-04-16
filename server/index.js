import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');


import homeRouter from './src/router/home';
import userRouter from './src/router/auth';
import folderRouter from './src/router/folder.router';
import noteRouters from './src/router/notes.router';

const mongoString = process.env.MONGODB_URL;
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json({ limit: '20mb' }));
app.use('/api', userRouter)
app.use('/api', folderRouter)
app.use('/api', noteRouters)

app.listen(8800, () => {
  console.log(`Server Started at ${8800}`);
});