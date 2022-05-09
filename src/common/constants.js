export const DRAWER_WIDTH = 240;
export const GRID_SPACING = 3;

const API = {
  API_URL: import.meta.env.VITE_API_URL,
  FOTA_URL: import.meta.env.VITE_FOTA_URL,
  AUTH_URL: import.meta.env.VITE_AUTH_URL,
  AUTH_HEADERS: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic cTJGZXhBWjk5M0l0NE04SVVCaTJWNUo2azI1WHpEVDE6MXVuazA4ZFJUOFRHQzh2Z01idndNZW4xMk9KbnhBSUM',
  },
  HEADERS: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  FORM_HEADERS: {
    'Content-Type': 'multipart/form-data',
    Authorization: '',
  },
  EXPORT_HEADERS: { 'Content-Type': 'application/octet-stream' },
};

const HTTP_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  ACCESS_DENY: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED_METHOD: 405,
  INTERNAL_SERVER_ERROR: 500,
};

const GROUP_ID = {
  PROTOCOL_GROUP: '001',
  PROTOCOL_TYPE: '002',
  PROTOCOL_API: '003',
  PROD_TYPE: '004',
  PROTOCOL_ITEM: '005',
  PROTOCOL_VALUE: '006',
  DEVICE_DISCONNECT_REASON: '007',
  DEVICE_RECONNECT_REASON: '008',
  PROTOCOL_ITEM_TYPE: '009',
  FIRMWARE_TYPE: '013',
  WIFI_HW_TYPE: '014',
  MCU_HW_TYPE: '015',
  TARGET_TYPE: '017',
  CERT_TYPE: '019',
  POLICY_STATUS: '020',
  PUBLISH_TYPE: '021',
  FOTA_STATUS: '023',
  CERT_STATUS: '024',
};

// 조회용 post list
const IMS_POST_FOR_INQUIRY_LIST = [
  '/admin/comCode/list',
  '/protocol/product/excel',
  '/protocol/api/excel',
  '/protocol/item/excel',
  '/protocol/item/list',
  '/protocol/item/listAll',
];

const FOTA_POST_FOR_INQUIRY_LIST = ['https://tcauth.coway.co.kr/oauth/token'];

export {
  API,
  HTTP_STATUS,
  GROUP_ID,
  IMS_POST_FOR_INQUIRY_LIST,
  FOTA_POST_FOR_INQUIRY_LIST,
};
