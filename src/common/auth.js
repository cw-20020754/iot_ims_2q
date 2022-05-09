import { Cookies } from 'react-cookie';
import { isNull } from './utils';
import CryptoJS from 'crypto-js';

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

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, import.meta.env.VITE_SECRET_KEY).toString();
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
};

export {
  isAuthenticated,
  setCookie,
  getCookie,
  removeCookie,
  encryptData,
  decryptData,
};
