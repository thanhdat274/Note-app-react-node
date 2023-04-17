import axios from 'axios';

export const connect = axios.create({
  baseURL: 'https://note-app-react-node-y78v.vercel.app/api',
});
