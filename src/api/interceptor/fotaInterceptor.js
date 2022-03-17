import axios from 'axios';
import { checkErrorStatus, isNull } from 'common/utils';
import { decryptData, getCookie } from 'common/auth';
import { HTTP_STATUS } from '../../common/constants';

const fotaInterceptor = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
fotaInterceptor.interceptors.request.use(
  (config) => {
    try {
      const token = getCookie('accessToken');
      if (!isNull(token)) {
        config.headers.Authorization = 'Bearer ' + decryptData(token);
      }
      return config;
    } catch (err) {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

fotaInterceptor.interceptors.response.use(
  (res) => {
    let success = true;

    if (isNull(res) || isNull(res.data) || res.status !== HTTP_STATUS.SUCCESS) {
      success = false;
    }
    return {
      ...res,
      success: success,
    };
  },
  async (error) => {
    if (!isNull(error) && error.response) {
      const { status, data } = error.response;
      checkErrorStatus(status, data.message);
    }
    return Promise.reject(error);
  },
);

export default fotaInterceptor;
