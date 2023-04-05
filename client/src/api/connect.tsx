import axios from 'axios';

export const connect = axios.create({
  baseURL: 'http://localhost:8000/api',
});
