import axios from 'axios';

export const connect = axios.create({
  baseURL: 'https://be-note-app.vercel.app/api',
});
