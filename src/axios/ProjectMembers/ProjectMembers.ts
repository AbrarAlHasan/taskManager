import axios from '../axios';
import {ResponseType} from '../@types';

export const getProjectMembers = async (
  projectId: String,
  memberId: String,
): Promise<ResponseType> => {
  try {
    const data = await axios.get(`/projectMember/${projectId}/${memberId}`);
    return [data.status, data.data];
  } catch (err: any) {
    if (err.response.status === 400) {
      return [err.response.status, err.response.data];
    }
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
  memberId: String,
  accessDetails:any
): Promise<ResponseType> => {
  try {
    const data = await axios.post(`/projectMember`, {
      projectId,
      userId,
      role,
      createdBy,
      memberId,
      accessDetails
    });
    return [data.status, data.data];
  } catch (err: any) {
    if (err.response.status === 400) {
      return [err.response.status, err.response.data];
    }
    return [err.response.status, err.response.data];
  }
};

export const getMemberId = async (
  projectId: String,
  userId: string,
): Promise<ResponseType> => {
  try {
    const data = await axios.post(`/projectMember/getMemberId`, {
      projectId,
      userId,
    });
    return [data.status, data.data];
  } catch (err: any) {
    return [err.response.status, err.response.data];
  }
};
