import { API } from 'common/constants';
import axios from 'api/interceptor/imsInterceptor';
import { makeurlQeuryString } from 'common/utils';

const exportHeaders = {
  headers: { 'Content-Type': 'application/octet-stream' },
};

/**
 * 공통코드 조회 (그룹 목록 기준)
 * @body {groupIds: Array string}
 * @returns
 */
export const postComCodeList = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/admin/comCode/list`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 그룹 조회
 * @returns
 */
export const getComCodeGroup = async () => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/admin/comCodeGroup`))
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 그룹 등록
 * @body {groupNm : string}
 * @returns
 */
export const postComCodeGroup = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/admin/comCodeGroup`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 그룹 수정
 * @body {groupId : string, groupNm : string}
 * @returns
 */
export const putComCodeGroup = async (body) => {
  return axios
    .put(`${API.API_URL}/v1/admin/comCodeGroup`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 그룹 삭제
 * @params {groupId : string}
 * @returns
 */
export const deleteComCodeGroup = async (params) => {
  return axios
    .delete(makeurlQeuryString(`${API.API_URL}/v1/admin/comCodeGroup/`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 목록 조회
 * @params {groupId : string, code : string, codeNm : string, page : integer, pageSize : integer}
 * @returns
 */
export const getComCode = async (params) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/admin/comCode/page`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 목록 엑셀 내려받기
 * @params {groupId : string, code : string, codeNm : string}
 * @returns
 */
export const getComCodeExport = async (params) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/admin/comCode/excel`, params), {
      Headers: exportHeaders,
      responseType: 'blob',
    })
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 중복체크
 * @params {groupId : string, code : string, langCode : string}
 * @returns boolean
 */
export const getComCodeDuplicateCheck = async (params) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.API_URL}/v1/admin/comCode/duplicateCheck`,
        params,
      ),
    )
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 등록
 * @body {groupId : string, code : string, langCode : string, codeNm : string}
 * @returns boolean
 */
export const postComCode = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/admin/comCode`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 공통코드 수정
 * @body {groupId : string, code : string, langCode : string, codeNm : string}
 * @returns boolean
 */
export const putComCode = async (body) => {
  return axios.put(`${API.API_URL}/v1/admin/comCode`, body).then((response) => {
    return response;
  });
};

/**
 * 공통코드 삭제
 * @body {groupId : string, code : string, langCode : string, codeNm : string}
 * @returns boolean
 */
export const deleteComCode = async (params) => {
  return axios
    .delete(makeurlQeuryString(`${API.API_URL}/v1/admin/comCode`, params))
    .then((response) => {
      return response;
    });
};
