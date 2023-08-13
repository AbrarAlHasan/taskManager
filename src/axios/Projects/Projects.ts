import axios from '../axios';
import {ResponseType} from '../@types';

export const getProjects = async (userId: String): Promise<ResponseType> => {
  try {
    const data = await axios.get(`project/${userId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const getProjectDetails = async (
  userId: String,
): Promise<ResponseType> => {
  try {
    const data = await axios.get(`project/${userId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};
