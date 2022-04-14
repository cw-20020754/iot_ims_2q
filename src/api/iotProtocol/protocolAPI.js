import { API } from 'common/constants';
import axios from 'api/interceptor/imsInterceptor';
import { makeurlQeuryString } from 'common/utils';

const exportHeaders = {
  headers: { 'Content-Type': 'application/octet-stream' },
};

/**
 * 프로토콜 API 조회
 * @params {prodTypeCode : string, typeCode : string}
 * @returns
 */
export const getProtocolApi = async (params) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/api`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 API 중복체크
 * @params {apiId : string, prodTypeCode : string, typeCode : string}
 * @returns
 */
export const getProtocolApiDuplicateCheck = async (params) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.API_URL}/v1/protocol/api/duplicateCheck`,
        params,
      ),
    )
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 API 등록
 * @body {
  "apiCode": "string",
  "apiDesc": "string",
  "apiDirectionCode": "string",
  "apiId": "string",
  "apiSeq": 0,
  "groupCode": "string",
  "prodTypeCode": "string",
  "typeCode": "string"
}
 * @returns
 */
export const postProtocolApi = async (body) => {
  return axios.post(`${API.API_URL}/v1/protocol/api`, body).then((response) => {
    return response;
  });
};

/**
 * 프로토콜 API 수정
 * @body {
  "apiCode": "string",
  "apiDesc": "string",
  "apiDirectionCode": "string",
  "apiId": "string",
  "apiSeq": 0,
  "groupCode": "string",
  "prodTypeCode": "string",
  "typeCode": "string"
}
 * @returns
 */
export const putProtocolApi = async (body) => {
  return axios.put(`${API.API_URL}/v1/protocol/api`, body).then((response) => {
    return response;
  });
};

/**
 * 프로토콜 API 엑셀 다운로드
 * @body {
  "columns": [
    "string"
  ],
  "prodTypeCode": "string",
  "typeCode": "string"
}
 * @returns
 */
export const postProtocolApiExport = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/api/excel`, body, {
      Headers: exportHeaders,
      responseType: 'blob',
    })
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 API 삭제
 * @params {api_seq : string}
 * @returns
 */
export const deleteProtocolApi = async (params) => {
  return axios
    .delete(makeurlQeuryString(`${API.API_URL}/v1/protocol/api/`, params))
    .then((response) => {
      return response;
    });
};
