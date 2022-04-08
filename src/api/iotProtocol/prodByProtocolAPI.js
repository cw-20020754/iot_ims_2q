import { API } from 'common/constants';
import axios from 'api/interceptor/imsInterceptor';
import { makeurlQeuryString } from 'common/utils';

// 제품별 프로토콜 조회
export const getProtocolByProduct = async (param) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/product`, param))
    .then((response) => {
      return response;
    });
};

// 제품별 프로토콜 변경
export const getChangeProtocolByProduct = async (param) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.API_URL}/v1/protocol/product/apiItemValue`,
        param,
      ),
    )
    .then((response) => {
      return response;
    });
};

// 제품별 프로토콜 저장
export const postProtocolByProduct = async (body) => {
  return axios.post(`${API.API_URL}/v1/protocol/product`, body).then((res) => {
    return res;
  });
};

// 제품별 프로토콜 엑셀 다운로드
export const postProdByProtocolExport = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/product/excel`, body, {
      Headers: API.EXPORT_HEADERS,
      responseType: 'blob',
    })
    .then((response) => {
      return response;
    });
};
