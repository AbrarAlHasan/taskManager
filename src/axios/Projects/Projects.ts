import axios from '../axios';
import {ResponseType} from '../@types';
import {createProjectDetailsType} from './@types';

export const getProjects = async (userId: String): Promise<ResponseType> => {
  try {
    const data = await axios.get(`project/${userId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const getProjectDetails = async (
  projectId: String,
  userId:String
): Promise<ResponseType> => {
  try {
    const data = await axios.get(`project/details/${projectId}/${userId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const addProject = async (
  projectDetails: createProjectDetailsType,
): Promise<ResponseType> => {
  try {
    const data = await axios.post(`project`, projectDetails);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};
