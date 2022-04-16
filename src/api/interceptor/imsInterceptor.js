import axios from 'axios';
import { isNull, saveAlert, store } from 'common/utils';
import { decryptData, getCookie } from 'common/auth';
import { checkErrorStatus } from 'common/utils';

const imsInterceptor = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
imsInterceptor.interceptors.request.use(
  (config) => {
    try {
      const token = getCookie('accessToken');

      if (!isNull(token)) {
        config.headers.Authorization = 'Bearer ' + decryptData(token);
      }

      const userId = store.getState().auth.username;

      if (!isNull(userId)) {
        config.headers.userId = decryptData(userId);
      }

      saveAlert('ims', config);
      return config;
    } catch (err) {}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

imsInterceptor.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { status, data } = error.response;
    if (!isNull(error) && error.response) {
      checkErrorStatus(status, !isNull(data.error) ? data.error : data);
    }
    return Promise.reject(error);
  },
);

export default imsInterceptor;
