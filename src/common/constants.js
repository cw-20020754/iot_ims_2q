const TITLE = {
  dashboard: "대시보드",
  deviceMonitoring: "디바이스 통합 모니터링",
};

const API = {
  FOTA_URL: process.env.REACT_APP_FOTA_URL,
  HEADERS: {
    "Content-Type": "application/json",
    Authorization: "",
  },
  FORM_HEADERS: {
    "Content-Type": "multipart/form-data",
    Authorization: "",
  },
};

export { TITLE, API };
