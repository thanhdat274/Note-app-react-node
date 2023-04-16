import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import userRouter from './src/router/auth';
import folderRouter from './src/router/folder.router';
import noteRouters from './src/router/notes.router';

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