import dayjs from "dayjs";
import qs from "qs";

const getText = (list, msgId) => {
  return list.find((el) => el.msgId === msgId).msg;
};

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

const fileSize = (size) => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const makeurlQeuryString = (url, param) => {
  if (param) {
    return (
      url + (typeof param === "string" ? param : "?" + qs.stringify(param))
    );
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
  return result;
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
  // console.log(type, value, catetory, codes);
  if (!isNull(value)) {
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
  } else {
    return value;
  }
};

const responseCheck = (res) => {
  let result = true;

  if (isNull(res) || isNull(res.payload)) {
    result = false;
  } else if (res.payload.hasOwnProperty("data") && isNull(res.payload.data)) {
    result = false;
  } else if (
    res.payload.hasOwnProperty("payload") &&
    isNull(res.payload.payload)
  ) {
    result = false;
  }

  return result;
};

export {
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
};
