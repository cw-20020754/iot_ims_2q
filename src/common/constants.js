export const DRAWER_WIDTH = 240;
export const GRID_SPACING = 3;

const API = {
  API_URL: process.env.REACT_APP_API_URL,
  FOTA_URL: process.env.REACT_APP_FOTA_URL,
  HEADERS: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  FORM_HEADERS: {
    'Content-Type': 'multipart/form-data',
    Authorization: '',
  },
};

export { API };
