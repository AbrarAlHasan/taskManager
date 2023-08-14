import axios from '../axios';
import {ResponseType} from '../@types';

export const loginUser = async (credentials: {
  email: string;
}): Promise<ResponseType> => {
  try {
    const data = await axios.post('user/login', credentials);
    return [data.status, data.data];
  } catch (err: any) {
    console.log('Error', err);
  }
};
