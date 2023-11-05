import axios from '../axios';
import {ResponseType} from '../@types';

export const getAccessControlDetails = async (
  memberId: String,
): Promise<ResponseType> => {
  try {
    const data = await axios.post(`/checkAccess`, {memberId});
    return [data.status, data.data];
  } catch (err) {
    console.log(err);
  }
};
