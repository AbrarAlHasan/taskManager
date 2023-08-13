import {LoginAPI} from '../axios';

export const createUser = async (signUpUserDetails: any) => {
  try {
    const data = await LoginAPI.post('/signup', signUpUserDetails);
    return [data.status, data.data];
  } catch (err: any) {
    console.log(err);
  }
};

export const otpVerify = async (otp: any) => {
  try {
    const data = await LoginAPI.post('/verifyOTP', {otp});
    return [data.status, data.data];
  } catch (err: any) {
    console.log(err);
  }
};

export const loginUser = async (credentials: any) => {
  try {
    const data = await LoginAPI.post('/login', credentials);
    return [data.status, data.data];
  } catch (err: any) {
    console.log(err);
    if (
      (err.response && err.response.status === 401) ||
      err.response.status === 402
    ) {
      return [err.response.status];
    } else console.log('Current Session Error', err);
  }
};

export const checkSession = async (refreshToken: any) => {
  try {
    const data = await LoginAPI.post('/currentSession', {refreshToken});
    // return null;
    return [data.status, data.data];
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      return [err.response.status];
    } else console.log('Current Session Error', err);
  }
};

export const forgetPassword = async (email: any) => {
  try {
    const data = await LoginAPI.post('/forgetPassword', {email});
    return [data.status, data.data];
  } catch (err: any) {
    console.log(err);
  }
};

export const resetPassword = async (details: any) => {
  try {
    const data = await LoginAPI.post('/resetPassword', details);
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
  }
};
