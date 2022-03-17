import { API } from '../common/constants';
import axios from './interceptor/fotaInterceptor';
import { makeurlQeuryString } from '../common/utils';

export const postToken = async (body) => {
  return axios
    .post(`${API.AUTH_URL}`, body, {
      headers: API.AUTH_HEADERS,
    })
    .then((response) => {
      return response;
    });
};
