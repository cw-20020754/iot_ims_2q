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

const getCodeToText = (category, data, options) => {
  if (isNull(data)) {
    return "";
  }
  const result = getCodeCategoryItems(options, category).find(
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
  if (param) {
    url = url + (typeof param === "string" ? param : "?" + qs.stringify(param));
    return url;
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
  if (list.length > 0) {
    list.map((item, index) => {
      rows.push({
        ...item,
        id: index,
        frmwrType: reformatData("frmwrType", item.frmwrType, codes),
        fileSizeTxt: reformatData("fileSizeTxt", item.fileSize),
        useYn: reformatData("useYn", item.useYn),
        regDate: reformatData("regDate", item.regDate),
        updDate: reformatData("updDate", item.updDate),
        targetType: reformatData("targetType", item.targetType, codes),
        policyStatusName: reformatData(
          "policyStatus",
          item.policyStatus,
          codes
        ),
        originDt: reformatData("originDt", item.originDt),
        wifiFotaStatus: reformatData("originDt", item.originDt, codes),
        mcuFotaStatus: reformatData("mcuFotaStatus", item.mcuFotaStatus, codes),
        fotaShadowStatus: reformatData(
          "fotaShadowStatus",
          item.fotaShadowStatus,
          codes
        ),
        certShadowStatus: reformatData(
          "certShadowStatus",
          item.certShadowStatus,
          codes
        ),
        isCertExpired: reformatData("isCertExpired", item.isCertExpired),
      });
      return rows;
    });
    return rows;
  }
};

/**
 *
 * @param field 구분자
 * @param data value
 * @param codes text info
 // 데이터 formatting
 */
const reformatData = (field, data, codes) => {
  // console.log("field, data, codes >> ", field, data, codes);
  switch (field) {
    case "frmwrType":
      return getCodeToText("frmwrType", data, codes);
    case "wifiFileSize":
    case "mcuFileSize":
    case "fileSizeTxt":
      return fileSize(data);
    case "wifiFotaStatus":
    case "mcuFotaStatus":
      return getCodeToText("fotaStatus", data, codes);
    case "fotaShadowStatus":
      return getCodeToText("fotaShadowStatus", data, codes);
    case "certShadowStatus":
      return getCodeToText("certShadowStatus", data, codes);
    case "targetType":
      return getCodeToText("targetType", data, codes);
    case "policyStatusName":
      return getCodeToText("policyStatus", data, codes);
    case "useYn":
    case "isCertExpired":
      return data ? "Y" : "N";
    case "regDate":
    case "updDate":
    case "originDt":
      return dateFormatConvert(data);
    default:
      return data;
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
