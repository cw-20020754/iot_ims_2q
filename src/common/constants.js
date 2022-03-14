export const DRAWER_WIDTH = 240;
export const GRID_SPACING = 3;

const API = {
  API_URL: process.env.REACT_APP_API_URL,
  FOTA_URL: process.env.REACT_APP_FOTA_URL,
  AUTH_URL: process.env.REACT_APP_AUTH_URL,
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
};

const HTTP_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED_METHOD: 405,
  INTERNAL_SERVER_ERROR: 500,
};

export { API, HTTP_STATUS };
