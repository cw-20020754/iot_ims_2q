import { API } from 'common/constants';
import axios from 'api/interceptor/imsInterceptor';
import { makeurlQeuryString } from 'common/utils';

const exportHeaders = {
  headers: { 'Content-Type': 'application/octet-stream' },
};

/**
 * 프로토콜 기능 + Value 목록 조회
 * @params 
 {
  "apiDirectionCode": "string",
  "apiId": "string",
  "apiNm": "string",
  "groupCode": "string",
  "itemId": "string",
  "itemNm": "string",
  "page": 0,
  "pageSize": 0,
  "prodTypeCode": "string",
  "typeCode": "string",
  "valueNm": "string"
}
 * @returns
 */
export const postProtocolFuncList = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/item/listAll`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 기능 + Value Export
 * @params 
{
  "apiDirectionCode": "string",
  "apiId": "string",
  "apiNm": "string",
  "columns": [
    "string"
  ],
  "groupCode": "string",
  "itemId": "string",
  "itemNm": "string",
  "prodTypeCode": "string",
  "typeCode": "string",
  "valueNm": "string"
}
 * @returns
 */
export const postProtocolFuncExport = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/item/excel`, body, {
      Headers: exportHeaders,
      responseType: 'blob',
    })
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 기능 중복체크
 * @params {itemId : string, prodTypeCode : string, typeCode : string, groupCode: string}
 * @returns
 */
export const getProtocolItemDuplicateCheck = async (params) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.API_URL}/v1/protocol/item/duplicateCheck`,
        params,
      ),
    )
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 기능 목록 조회
 * @body {
  "apiDirectionCode": "string",
  "apiId": "string",
  "apiNm": "string",
  "groupCode": "string",
  "itemId": "string",
  "itemNm": "string",
  "page": 0,
  "pageSize": 0,
  "prodTypeCode": "string",
  "typeCode": "string",
  "valueNm": "string"
 }
 * @returns
 */
export const postProtocolItemList = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/item/list`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 기능 조회
 * @params {itemSeq : number}
 * @returns
 */
export const getProtocolItem = async (params) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/item`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 기능 등록
 * @body {
  "itemAttrNm": "string",
  "deprecatedYn": "string",
  "groupCode": "string",
  "itemCode": "string",
  "itemDesc": "string",
  "itemId": "string",
  "itemSeq": 0,
  "itemTypeCode": "string",
  "length": 0,
  "prodTypeCode": "string",
  "typeCode": "string"
}
 * @returns
 */
export const postProtocolItem = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/item`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 기능 수정
 * @body {
  "itemAttrNm": "string",
  "deprecatedYn": "string",
  "groupCode": "string",
  "itemCode": "string",
  "itemDesc": "string",
  "itemId": "string",
  "itemSeq": 0,
  "itemTypeCode": "string",
  "length": 0,
  "prodTypeCode": "string",
  "typeCode": "string"
}
 * @returns
 */
export const putProtocolItem = async (body) => {
  return axios.put(`${API.API_URL}/v1/protocol/item`, body).then((response) => {
    return response;
  });
};

/**
 * 프로토콜 기능 삭제
 * @params {itemSeq : number}
 * @returns
 */
export const deleteProtocolItem = async (params) => {
  return axios
    .delete(makeurlQeuryString(`${API.API_URL}/v1/protocol/item/`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 Value 목록 조회
 * @params {itemSeq : number, valueNm: string}
 * @returns
 */
export const getProtocolValueList = async (params) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/value/list`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 Value 조회
 * @params {itemSeq : number, valueSeq : number}
 * @returns
 */
export const getProtocolValue = async (params) => {
  return axios
    .get(makeurlQeuryString(`${API.API_URL}/v1/protocol/value`, params))
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 Value 중복체크
 * @params {itemSeq : number, valueSeq : number}
 * @returns
 */
export const getProtocolValueDuplicateCheck = async (params) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.API_URL}/v1/protocol/value/duplicateCheck`,
        params,
      ),
    )
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 Value 등록
 * @body {
  "groupCode": "string",
  "itemSeq": 0,
  "valueCode": "string",
  "valueDesc": "string",
  "valueDirectionCode": "string",
  "valueId": "string",
  "valueSeq": 0
}
 * @returns
 */
export const postProtocolValue = async (body) => {
  return axios
    .post(`${API.API_URL}/v1/protocol/value`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 Value 수정
 * @body {
  "groupCode": "string",
  "itemSeq": 0,
  "valueCode": "string",
  "valueDesc": "string",
  "valueDirectionCode": "string",
  "valueId": "string",
  "valueSeq": 0
}
 * @returns
 */
export const putProtocolValue = async (body) => {
  return axios
    .put(`${API.API_URL}/v1/protocol/value`, body)
    .then((response) => {
      return response;
    });
};

/**
 * 프로토콜 Value 삭제
 * @params {itemSeq : number, valueSeq: number}
 * @returns
 */
export const deleteProtocolValue = async (params) => {
  return axios
    .delete(makeurlQeuryString(`${API.API_URL}/v1/protocol/value`, params))
    .then((response) => {
      return response;
    });
};
