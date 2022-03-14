import axios from '../api/commonAPI';
import { API } from '../common/constants';
export const postToken = async (body) => {
  try {
    return await axios.post(`${API.AUTH_URL}`, body, {
      headers: API.AUTH_HEADERS,
    });
  } catch (error) {
    // console.log('error >> ', error);
    return error.response;
  }
};
