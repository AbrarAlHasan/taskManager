import {ResponseType} from '../@types';
import axios from '../axios';

export const getTasks = async (projectId: string): Promise<ResponseType> => {
  try {
    const data = await axios.get(`task/${projectId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};
export const getTaskDetails = async (taskId: string): Promise<ResponseType> => {
  try {
    const data = await axios.get(`task/details/${taskId}`);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const getMyTasks = async (
  userId: string,
  selected?: string,
): Promise<ResponseType> => {
  try {
    const url = selected
      ? `task/myTasks/${userId}?status=${selected}`
      : `task/myTasks/${userId}`;
    const data = await axios.get(url);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const getProjects = async (
  userId: string,
  projectSearch: string,
): Promise<ResponseType> => {
  try {
    const data = await axios.get(
      `/task/getProjects/${userId}?name=${projectSearch}`,
    );
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const getMembers = async (
  projectId: string,
  membersSearch: string,
): Promise<ResponseType> => {
  try {
    const data = await axios.get(
      `/task/getMembers/${projectId}?name=${membersSearch}`,
    );
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};

export const addTasks = async (details: any): Promise<ResponseType> => {
  try {
    const data = await axios.post(`/task`, details);
    return [data.status, data.data];
  } catch (err) {
    return err;
  }
};
