import axios from "axios";
import apiController from "./apiController";
import { API } from "../../common/constants";
import { checkResult, makeurlQeuryString } from "../../common/utils/CowayUtils";
// import client from "./client";

// 펌웨어 목록
export const getFirmwareList = (param) => {
  // console.log(
  //   "getFirmwareList >>> ",
  //   param,
  //   makeurlQeuryString(`${API.FOTA_URL}/iot/v1/fota/manager/firmware`, param)
  // );
  return axios
    .get(
      makeurlQeuryString(`${API.FOTA_URL}/iot/v1/fota/manager/firmware`, param),
      {
        headers: API.HEADERS,
      }
    )
    .then((response) => {
      // console.log("response >> ", JSON.stringify(response.data));
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// fota 펌웨어 등록
export const postFirmware = async (body) => {
  return axios
    .post(`${API.FOTA_URL}/iot/v1/fota/uploader/firmware`, body, {
      headers: API.FORM_HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// fota 펌웨어 수정
export const putFirmware = (body) => {
  return axios
    .put(`${API.FOTA_URL}/iot/v1/fota/manager/firmware`, body, {
      headers: API.HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// fota 펌웨어 삭제
export const deleteFirmware = (policyId) => {
  return axios
    .delete(
      // makeurlQeuryString(
      //   `${API.FOTA_URL}/iot/v1/fota/manager/firmware`,
      //   frmwrId
      // ),
      `${API.FOTA_URL}/iot/v1/fota/manager/firmware/${policyId}`,
      {
        headers: API.HEADERS,
      }
    )
    .then((response) => {
      return response;
      // console.log("response >> ", JSON.stringify(response));
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};
/**
 * FOTA 정책 관리
 */
// FOTA 정책 목록 조회
export const getFotaPolicyList = (param) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.FOTA_URL}/iot/v1/fota/manager/policy/fota`,
        param
      ),
      {
        headers: API.HEADERS,
      }
    )
    .then((response) => {
      // console.log("response >> ", JSON.stringify(response.data));
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};
// FOTA 정책 등록
export const postFotaPolicy = (body) => {
  return axios
    .post(`${API.FOTA_URL}/iot/v1/fota/manager/policy/fota`, body, {
      headers: API.HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// FOTA 정책 수정
export const putFotaPolicy = (body) => {
  return axios
    .put(`${API.FOTA_URL}/iot/v1/fota/manager/policy/fota`, body, {
      headers: API.HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// FOTA 정책 삭제
export const deleteFotaPolicy = (frmwrId) => {
  return axios
    .delete(`${API.FOTA_URL}/iot/v1/fota/manager/policy/fota/${frmwrId}`, {
      headers: API.HEADERS,
    })
    .then((response) => {
      return response;
      // console.log("response >> ", JSON.stringify(response));
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};
/**
 * 인증서 정책관리
 */
// 인증서 정책 목록 조회
export const getCertPolicyList = (param) => {
  return axios
    .get(
      makeurlQeuryString(
        `${API.FOTA_URL}/iot/v1/fota/manager/policy/cert`,
        param
      ),
      {
        headers: API.HEADERS,
      }
    )
    .then((response) => {
      // console.log("response >> ", JSON.stringify(response.data));
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// 인증서 정책 등록
export const postCertPolicy = (body) => {
  return axios
    .post(`${API.FOTA_URL}/iot/v1/fota/manager/policy/cert`, body, {
      headers: API.HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// 인증서 정책 수정
export const putCertPolicy = (body) => {
  return axios
    .put(`${API.FOTA_URL}/iot/v1/fota/manager/policy/cert`, body, {
      headers: API.HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// 인증서 정책 삭제
export const deleteCertPolicy = (policyId) => {
  return axios
    .delete(`${API.FOTA_URL}/iot/v1/fota/manager/policy/cert/${policyId}`, {
      headers: API.HEADERS,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

/*
 * 상태 조회
 */
export const getStatusList = (param) => {
  return axios
    .get(
      makeurlQeuryString(`${API.FOTA_URL}/iot/v1/fota/manager/shadow`, param),
      {
        headers: API.HEADERS,
      }
    )
    .then((response) => {
      // console.log("response >> ", JSON.stringify(response.data));
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

/**
 * 이력 조회
 */
/**
 * 이력 조회
 */
export const getHistoryList = (param) => {
  return axios
      .get(
          makeurlQeuryString(`${API.FOTA_URL}/iot/v1/shadow/history/shadow`, param),
          {
            headers: API.HEADERS,
          }
      )
      .then((response) => {
        console.log("response >> ", JSON.stringify(response.data));
        return response;
      })
      .catch((err) => {
        if (err.response) return err.response;
      });
};

