import { API } from 'common/constants';
import axios from './interceptor';
import { makeurlQeuryString } from 'common/utils';

// 펌웨어 목록
export const getFirmwareList = (param) => {
  return axios
    .get(
      makeurlQeuryString(`${API.FOTA_URL}/iot/v1/fota/manager/firmware`, param),
    )
    .then((response) => {
      // console.log('response 222 >> ', JSON.stringify(response));
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
    .put(`${API.FOTA_URL}/iot/v1/fota/manager/firmware`, body)
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
    .delete(`${API.FOTA_URL}/iot/v1/fota/manager/firmware/${policyId}`)
    .then((response) => {
      return response;
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
        param,
      ),
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};
// FOTA 정책 등록
export const postFotaPolicy = (body) => {
  return axios
    .post(`${API.FOTA_URL}/iot/v1/fota/manager/policy/fota`, body)
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
    .put(`${API.FOTA_URL}/iot/v1/fota/manager/policy/fota`, body)
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
    .delete(`${API.FOTA_URL}/iot/v1/fota/manager/policy/fota/${frmwrId}`)
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
        param,
      ),
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
    .post(`${API.FOTA_URL}/iot/v1/fota/manager/policy/cert`, body)
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
    .put(`${API.FOTA_URL}/iot/v1/fota/manager/policy/cert`, body)
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
    .delete(`${API.FOTA_URL}/iot/v1/fota/manager/policy/cert/${policyId}`)
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
    )
    .then((response) => {
      // console.log("response >> ", JSON.stringify(response.data));
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

// 상태 초기화
export const deleteStatus = (serial) => {
  return axios
    .delete(`${API.FOTA_URL}/iot/v1/test/shadow/reset/${serial}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};

/**
 * 이력 조회
 */
export const getHistoryList = (param) => {
  return axios
    .get(
      makeurlQeuryString(`${API.FOTA_URL}/iot/v1/shadow/history/shadow`, param),
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      if (err.response) return err.response;
    });
};
