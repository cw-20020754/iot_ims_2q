import axios from "axios";
import * as Constants from "../../common/constants";
// import { getAccessToken } from './accessToken';

/**
 * 제품 정보 관련 API
 */
export const getDeviceInfo = async (serial) => {};
/**
 * 주문 정보 관련 API
 */
export const getSerialInfo = async (orderNo) => {};

// 제품 연결
export const getDeviceConnect = async (serial) => {};

// 제품 상태
export const getDeviceStatus = async (serial) => {
  // const accessToken = await getAccessToken();
  // // 예외처리 필요, 인증에러 나면 다시 access token 요청 필요.
  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${accessToken.data.access_token}`,
  //     'Content-Type': 'application/json',
  //     'X-IoCare-Request-Type': '11',
  //   },
  // };
  // return axios.get(`${process.env.REACT_APP_IOCARE_ADMIN}/device/state/status/${serial}`, header);
};

// 공기질 측정 데이터
export const getDeviceSensor = async (serial) => {
  // const accessToken = await getAccessToken();
  // // 예외처리 필요, 인증에러 나면 다시 access token 요청 필요.
  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${accessToken.data.access_token}`,
  //     'Content-Type': 'application/json',
  //     'X-IoCare-Request-Type': '11',
  //   },
  // };
  // return axios.get(`${process.env.REACT_APP_IOCARE_ADMIN}/device/state/sensor/${serial}`, header);
};

// 제품 센서 에러
export const getDeviceError = async (serial) => {
  // const accessToken = await getAccessToken();
  // // 예외처리 필요, 인증에러 나면 다시 access token 요청 필요.
  // const header = {
  //   headers: {
  //     Authorization: `Bearer ${accessToken.data.access_token}`,
  //     'Content-Type': 'application/json',
  //     'X-IoCare-Request-Type': '11',
  //   },
  // };
  // return axios.get(`${process.env.REACT_APP_IOCARE_ADMIN}/device/state/error/${serial}`, header);
};
