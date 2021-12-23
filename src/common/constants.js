const TITLE = {
  dashboard: "대시보드",
  deviceMonitoring: "디바이스 통합 모니터링",
};

const API = {
  FOTA_URL: "https://tfota-api.iocareus.com",
  HEADERS: {
    "Content-Type": "application/json",
    Authorization: "",
  },
  FORM_HEADERS: {
    "Content-Type": "multipart/form-data",
    Authorization: "",
  },
};

const POLICY_STATUS = {
  0: "NONE",
  1: "신규",
  2: "배포대기",
  3: "배포중",
  4: "성공",
  5: "실패",
};

export { TITLE, API, POLICY_STATUS };
