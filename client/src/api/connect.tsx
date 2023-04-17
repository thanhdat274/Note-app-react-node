import axios from 'axios';

export const connect = axios.create({
  baseURL: 'https://note-app-react-node-z44g.vercel.app/api',
});
