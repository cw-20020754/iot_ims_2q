import { API } from '../common/constants';
import axios from './interceptor/fotaInterceptor';

export const postToken = async (body) => {
  try {
    return await axios.post(`${API.AUTH_URL}`, body, {
      headers: API.AUTH_HEADERS,
    });
  } catch (error) {
    return error.response;
  }
};
