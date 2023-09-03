import axios from '../axios';
import {ResponseType} from '../@types';

export const getProjectMembers = async (
  projectId: String,
): Promise<ResponseType> => {
  try {
    const data = await axios.get(`/projectMember/${projectId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const getVerifyMember = async (
  email?: string,
): Promise<ResponseType> => {
  try {
    const data = await axios.get(`/projectMember/checkUser?email=${email}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const addMember = async (
  projectId: String,
  userId: string,
  role: string,
  createdBy: string,
): Promise<ResponseType> => {
  try {
    const data = await axios.post(`/projectMember`, {
      projectId,
      userId,
      role,
      createdBy,
    });
    return [data.status, data.data];
  } catch (err: any) {
    return [err.response.status, err.response.data];
  }
};
