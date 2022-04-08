import axios from './interceptor/imsInterceptor';
import { makeurlQeuryString } from '../common/utils';
import { API } from '../common/constants';

/**
 * 기기 모델 코드 조회
 */
export const getDevModelCode = async (param) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/device/modelCode`, param))
    .then((response) => {
      return response;
    });
};
