import { Cookies } from 'react-cookie';
import { isNull } from './utils';

const cookies = new Cookies();
const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};
const getCookie = (name) => {
  return cookies.get(name);
};

const removeCookie = (name, options) => {
  return cookies.remove(name, { ...options });
};
// 인증 여부
const isAuthenticated = () => {
  const accessToken = getCookie('accessToken');

  return !isNull(accessToken);
};

const getLocaleId = () => {
  // return store.getters['auth/localeId'];
};

export { isAuthenticated, getLocaleId, setCookie, getCookie, removeCookie };
