import dayjs from "dayjs";
import qs from "qs";

/**
 * 공통 Util
 */
const isNull = (data) => {
  let result = false;
  if (
    data === null ||
    data === undefined ||
    data === "" ||
    data === "undefined" ||
    data === "null"
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
    return "";
  }
  const result = getCodeCategoryItems(codes, category).find(
    (el) => el.value === data
  );
  return !isNull(result) ? result.text : data;
};

const getText = (list, msgId) => {
  return list.find((el) => el.msgId === msgId).msg;
};
// Date Formatting
const dateFormatConvert = (date) => {
  if (isNull(date)) {
    return "";
  }
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

// Date to Timestamp
const dateToTimestampConvert = (date) => {
  if (isNull(date)) {
    return "";
  }
  return dayjs(date).valueOf();
};

const makeurlQeuryString = (url, param) => {
  let fullUrl = "";
  if (param) {
    fullUrl =
      url + (typeof param === "string" ? param : "?" + qs.stringify(param));
    return fullUrl;
  } else {
    return url;
  }
};

const makeQuery = (param, condition) => {
  let result = "";

  result = "?" + new URLSearchParams(param).toString() + "&";
  if (!isNull(condition)) {
    let option = {};
    option = {
      ...condition,
      startDate: dateToTimestampConvert(condition.startDate),
      endDate: dateToTimestampConvert(condition.endDate),
    };

    result += new URLSearchParams(option).toString();
  }
  // console.log("makeQuery >> ", result);
  return result;
};

const checkResult = (res) => {
  let result = true;

  if (isNull(res) || isNull(res.payload)) {
    return false;
  } else if (res.payload.hasOwnProperty("data") && isNull(res.payload.data)) {
    return false;
  } else if (
    res.payload.hasOwnProperty("payload") &&
    isNull(res.payload.payload)
  ) {
    return false;
  }

  return result;
};

const fileSize = (size) => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const makeRowsFormat = (list, codes) => {
  let rows = [];
  if (Array.isArray(list) && list.length > 0) {
    list.forEach((item, index) => {
      rows.push({
        ...item,
        id: index,
        frmwrType: reformatData("text", item.frmwrType, "frmwrType", codes),
        fileSizeTxt: reformatData("fileSize", item.fileSize),
        useYn: reformatData("yn", item.useYn),
        regDate: reformatData("date", item.regDate),
        updDate: reformatData("date", item.updDate),
        targetType: reformatData("text", item.targetType, "targetType", codes),
        policyStatusName: reformatData(
          "text",
          item.policyStatus,
          "policyStatus",
          codes
        ),
        originDt: reformatData("date", item.originDt),
        wifiFotaStatus: reformatData("text", item.originDt, "originDt", codes),
        mcuFotaStatus: reformatData(
          "text",
          item.mcuFotaStatus,
          "mcuFotaStatus",
          codes
        ),
        fotaShadowStatus: reformatData(
          "text",
          item.fotaShadowStatus,
          "fotaShadowStatus",
          codes
        ),
        certShadowStatus: reformatData(
          "text",
          item.certShadowStatus,
          "certShadowStatus",
          codes
        ),
        isCertExpired: reformatData("yn", item.isCertExpired),
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
  switch (type) {
    case "text":
      return getCodeToText(catetory, value, codes);
    case "date":
      return dateFormatConvert(value);
    case "fileSize":
      return fileSize(value);
    case "yn":
      return value ? "Y" : "N";
    default:
      break;
  }
};

// excel data 형태로 변형
const makeExcelFormat = (row, column) => {
  let result = [];

  row.map((item) => {
    let obj = {};
    column.map((data) => {
      if (!isNull(data) && !isNull(item[data.field]) && !data.hide) {
        obj[data.headerName] = item[data.field];
      }
      return obj;
    });

    result.push(obj);
    return item;
  });
  return result;
};

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export {
  isNull,
  getCodeCategoryItems,
  dateFormatConvert,
  dateToTimestampConvert,
  makeurlQeuryString,
  checkResult,
  makeRowsFormat,
  fileSize,
  makeQuery,
  makeExcelFormat,
  getText,
  escapeRegExp,
  reformatData,
};
