import axios from 'axios';
import { isNull } from 'common/utils/';
import { history } from 'App';
import { HTTP_STATUS } from 'common/constants';
import { getCookie } from 'common/auth';

const interceptor = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/',
  headers: {
    'Content-Type': 'application/json',
  },
});
interceptor.interceptors.request.use(
  (config) => {
    // console.log('config > ', config);
    try {
      const token = getCookie('accessToken');

      if (!isNull(token)) {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    } catch (err) {
      // console.error('[_axios.interceptors.request] config : ' + err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interceptor.interceptors.response.use(
  (res) => {
    // console.log('res >> ', res, history);
    return res;
  },
  (error) => {
    // console.log('@@ error >> ', error.response);
    if (!isNull(error) && error.response) {
      const { status } = error.response;
      if (status === HTTP_STATUS.UNAUTHORIZED) {
        history.push('/accessdeny');
      } else if (status === HTTP_STATUS.NOT_FOUND) {
        history.push('/pagenotfound');
      } else if (status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        history.push('/internalerror');
      } else {
        history.push('/networkerror');
      }
      history.go();
    }
    return Promise.reject(error);
  },
);

export default interceptor;
