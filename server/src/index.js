import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';
import homeRouter from './router/home';
import userRouter from './router/auth';

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;
// Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-app.e8a6igu.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(homeRouter);
app.use('/api', userRouter)

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