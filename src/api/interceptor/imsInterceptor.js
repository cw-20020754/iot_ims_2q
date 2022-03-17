import axios from 'axios';
import store from 'redux/store';
import { isNull } from 'common/utils';
import { decryptData, getCookie } from 'common/auth';
import { checkErrorStatus } from '../../common/utils';
import { HTTP_STATUS } from '../../common/constants';

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
    const { status, data } = error.response;
    if (!isNull(error) && error.response) {
      checkErrorStatus(status, data.error.message);
    }
    return Promise.reject(error);
  },
);

export default imsInterceptor;
