import dayjs from 'dayjs';
import qs from 'qs';
import xlsx from 'xlsx';
import { HTTP_STATUS } from './constants';
import i18n from 'common/locale/i18n';
import { setSnackbar } from '../redux/reducers/changeStateSlice';
import { removeCookie } from './auth';
import { persistor } from '../index';
import { history } from 'App';

let store;
const injectStore = (_store) => {
  store = _store;
};

const getText = (list, msgId) => {
  return list.find((el) => el.msgId === msgId).msg;
};

const isNull = (data) => {
  let result = false;
  if (
    data === null ||
    data === undefined ||
    data === '' ||
    data === 'undefined' ||
    data === 'null'
  ) {
    result = true;
  }
  return result;
};

const getCodeCategoryItems = (list, category) => {
  return list.find((el) => el.category === category).items;
};

const getCodeToText = (category, data, codes) => {
  if (isNull(data)) {
    return '';
  }
  const result = getCodeCategoryItems(codes, category).find(
    (el) => el.value === data,
  );
  return !isNull(result) ? result.text : data;
};

// Date Formatting
const dateFormatConvert = (date) => {
  if (isNull(date)) {
    return '';
  }
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

// Date to Timestamp
const dateToTimestampConvert = (date) => {
  if (isNull(date)) {
    return '';
  }
  return dayjs(date).valueOf();
};

const fileSize = (size) => {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const makeurlQeuryString = (url, param) => {
  if (param) {
    return (
      url + (typeof param === 'string' ? param : '?' + qs.stringify(param))
    );
  } else {
    return url;
  }
};

const makeQuery = (param, condition) => {
  let result = '';

  result = '?' + new URLSearchParams(param).toString() + '&';
  if (!isNull(condition)) {
    let option = {};
    option = {
      ...condition,
      startDate: dateToTimestampConvert(condition.startDate),
      endDate: dateToTimestampConvert(condition.endDate),
    };

    result += new URLSearchParams(option).toString();
  }
  return result;
};

const makeRowsFormat = (list, codes) => {
  let rows = [];
  if (Array.isArray(list) && list.length > 0) {
    list.forEach((item, index) => {
      rows.push({
        ...item,
        id: index,
        frmwrType: reformatData('text', item.frmwrType, 'frmwrType', codes),
        fileSizeTxt: reformatData('fileSize', item.fileSize),
        useYn: reformatData('yn', item.useYn),
        regDate: reformatData('date', item.regDate),
        updDate: reformatData('date', item.updDate),
        targetType: reformatData('text', item.targetType, 'targetType', codes),
        policyStatusName: reformatData(
          'text',
          item.policyStatus,
          'policyStatus',
          codes,
        ),
        originDt: reformatData('date', item.originDt),
        wifiFotaStatus: reformatData('text', item.originDt, 'originDt', codes),
        mcuFotaStatus: reformatData(
          'text',
          item.mcuFotaStatus,
          'mcuFotaStatus',
          codes,
        ),
        fotaShadowStatus: reformatData(
          'text',
          item.fotaShadowStatus,
          'fotaShadowStatus',
          codes,
        ),
        certShadowStatus: reformatData(
          'text',
          item.certShadowStatus,
          'certShadowStatus',
          codes,
        ),
        isCertExpired: reformatData('yn', item.isCertExpired),
      });
    });
  }
  return rows;
};

/**
 *
 * @param type 분류 값
 * @param value data value
 * @param catetory text 구분자
 * @param codes codes text info
 * @returns {string|*|string}
 */
const reformatData = (type, value, catetory, codes) => {
  // console.log(type, value, catetory, codes);
  if (!isNull(value)) {
    switch (type) {
      case 'text':
        return getCodeToText(catetory, value, codes);
      case 'date':
        return dateFormatConvert(value);
      case 'fileSize':
        return fileSize(value);
      case 'yn':
        return value ? 'Y' : 'N';
      default:
        break;
    }
  } else {
    return value;
  }
};

const responseCheck = (res) => {
  let result = true;

  if (!isNull(res) && res.type.includes('rejected')) {
    result = false;
  }
  return result;
};

const onExcelDownload = (title, row, columns) => {
  let result = [];
  row.map((item) => {
    let obj = {};
    columns.map((data) => {
      if (!isNull(data) && !isNull(item[data.field]) && !data.hide) {
        obj[data.headerName] = item[data.field];
      }
      return obj;
    });

    result.push(obj);
    return item;
  });

  const ws = xlsx.utils.json_to_sheet(result);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  xlsx.writeFile(
    wb,
    `${title}_${dayjs(new Date()).format('YYMMDDHHmmssSSS')}.xlsx`,
  );

  return result;
};

const checkValidtaion = (ruleArray, value, option) => {
  let errorText = '';
  if (!isNull(ruleArray) && ruleArray.length > 0) {
    ruleArray.every((item) => {
      if (typeof item === 'string') {
        errorText = item;
        return false;
      } else {
        errorText = '';
      }
      return item;
    });
  }
  return errorText;
};

const checkErrorStatus = async (status, error) => {
  let msg = '';
  const { message, code } = error;
  if (status === HTTP_STATUS.UNAUTHORIZED) {
    removeCookie('accessToken');
    await persistor.purge();
    history.push('/login', { sessionExpired: true });
    history.go();
  } else if (status !== HTTP_STATUS.SUCCESS) {
    msg = isNull(code) ? message : `[${code}]\n${message}`;
  } else {
    msg = `${i18n.t('desc.networkError')}`;
  }
  if (!isNull(message)) {
    store.dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarMessage: msg,
        autoHideDuration: 3000,
      }),
    );
  }
};

export {
  injectStore,
  getText,
  isNull,
  makeQuery,
  dateToTimestampConvert,
  makeurlQeuryString,
  makeRowsFormat,
  dateFormatConvert,
  fileSize,
  getCodeCategoryItems,
  responseCheck,
  onExcelDownload,
  checkValidtaion,
  checkErrorStatus,
};
