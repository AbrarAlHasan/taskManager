import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.111:8000/taskManager/',
});

export const LoginAPI = axios.create({
  baseURL: 'http://192.168.0.111:8000/',
});

export default API;
