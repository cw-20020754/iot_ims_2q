import axios from 'axios';
import { checkErrorStatus, isNull, saveAlert } from 'common/utils';
import { decryptData, getCookie } from 'common/auth';

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

      saveAlert('fota', config);

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
    return res;
  },
  async (error) => {
    if (!isNull(error) && error.response) {
      const { status, data } = error.response;
      checkErrorStatus(status, data);
    }
    return Promise.reject(error);
  },
);

export default fotaInterceptor;
