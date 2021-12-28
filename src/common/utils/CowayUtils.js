import dayjs from "dayjs";
import * as queryString from "querystring";
import { POLICY_STATUS } from "../constants";
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
  // console.log("@@@ list : ", list);
  // console.log("@@@ category : ", category);
  return list.find((el) => el.category === category).items;
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
    url =
      url +
      (typeof param === "string" ? param : "?" + queryString.stringify(param));
    return url;
  } else {
    return url;
  }
};

const makeParamForCondition = (condition, options) => {
  let param = null;

  // page=0&size=5&frmwrName=1&frmwrType=1&devModelCode=02FER&frmwrVer=2&fromDt=1638370800000&toDt=1638975599000
  // let param =
  //   options !== null
  //     ? this.makeParamForServerPage(options)
  //     : "?page=0&size=".concat(condition.totalItem);

  // Object.entries(condition).forEach((cond) => {
  //   if (cond[1] !== undefined && cond[1] !== null) {
  //     param = param.concat("&").concat(cond[0]).concat("=").concat(cond[1]);
  //   }
  // });
  // console.log("param >>> ", param);
  return param;
};

const makeQuery = (param, condition) => {
  let result = "";

  // if (!isNull(condition)) {
  //   obj = Object.fromEntries(
  //     Object.entries(condition).filter(([_, v]) => !isNull(v))
  //   );
  // }

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

  // console.log(result);

  return result;
};

const fileSize = (size) => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const makeRowsFormat = (res, category) => {
  // console.log("makeRowsFormat >> ", res);
  let rows = [];
  if (res.length > 0) {
    res.map((item, index) => {
      rows.push({
        ...item,
        id: index,
        frmwrType: item.frmwrType === 1 ? "WIFI" : "MCU",
        fileSizeTxt: fileSize(item.fileSize),
        useYn: item.useYn ? "Y" : "N",
        regDate: dateFormatConvert(item.regDate),
        updDate: dateFormatConvert(item.updDate),
        targetType: item.targetType === 1 ? "제품군" : "단일제품",
        policyStatusName: POLICY_STATUS[item.policyStatus],
      });
      return rows;
    });
  }
  // console.log("rows >> ", rows);
  return rows;
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

export {
  isNull,
  getCodeCategoryItems,
  dateFormatConvert,
  dateToTimestampConvert,
  makeurlQeuryString,
  checkResult,
  makeRowsFormat,
  fileSize,
  makeParamForCondition,
  makeQuery,
  makeExcelFormat,
};
