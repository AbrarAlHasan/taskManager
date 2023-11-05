import axios from 'axios';
//Nafil - 192.168.38.143
//Abrar - 192.168.133.143
const API = axios.create({
  baseURL: 'http://192.168.38.143:8000/taskManager/',
});

export const LoginAPI = axios.create({
  baseURL: 'http://192.168.38.143:8000/',
});

export default API;
