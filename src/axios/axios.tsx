import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../Store/index';
import {logoutUser} from '../Store/Authentication';

const baseURL = 'https://personal-project-app-backend-service.onrender.com/';
// const baseURL = 'http://192.168.0.110:8000/'
const commonHeaders = {
  'Content-Type': 'application/json',
  // Add other headers as needed
};

// Async function to get tokens
const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    return {accessToken, refreshToken};
  } catch (error) {
    throw error;
  }
};

const API = axios.create({
  baseURL: baseURL + 'taskManager/',
  headers: commonHeaders,
});

// Interceptor to add tokens to request headers
API.interceptors.request.use(async config => {
  try {
    const {accessToken, refreshToken} = await getTokens();

    config.headers['Authorization'] = `Bearer ${accessToken}`;
    config.headers['x-refresh-key'] = refreshToken;

    return config;
  } catch (error) {
    throw error;
  }
});

API.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 405) {
      // Access Token Expired
      try {
        const newAccessToken = error.response.data.accessToken;

        // Update the tokens in AsyncStorage
        await AsyncStorage.setItem('accessToken', newAccessToken);

        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutUser(''));
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('accessToken');
        // Handle token update error, for example, log out the user
        // You may also redirect to the login page or perform other actions
        throw refreshError;
      }
    } else if (error.response && error.response.status === 420) {
      store.dispatch(logoutUser(''));
    }

    return Promise.reject(error);
  },
);

export const LoginAPI = axios.create({
  baseURL: baseURL,
});

export default API;
