import React, { useState, useEffect } from "react";
import { CCard } from "@coreui/react";
import { Alert, AlertTitle, FormControlLabel, styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Button, Select, Switch, TextField } from "@material-ui/core";
import {
  checkResult,
  dateToTimestampConvert,
  getCodeCategoryItems,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  getFirmwareList,
  postCertPolicy,
  putCertPolicy,
  putFotaPolicy,
} from "../../redux/reducers/fotaInfoSlice";
import rules from "../../common/utils/rules";

/**
 * 인증서 정책관리 상세 페이지
 */
const CertPolicyManagementDetailPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = isNull(props.location.state) ? "" : props.location.state;
  const { isEdit } = isNull(props.location.state) ? "" : props.location.state;
  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [validation, setValidation] = useState({
    policyName: "",
    policyDesc: "",
    targetId: "",
  });
  const options = useSelector((state) => state.getData.codes);
  const [submitData, setSubmitData] = useState({
    policyId: "",
    policyName: "",
    policyDesc: "",
    targetId: "",
    targetType: 1, // 배포 대상유형
    publishType: 1, // 배포 유형
    publishDate: "",
    policyStatus: 1,
    regId: "i.Trust",
    updId: "i.Trust",
    useYn: true,
    regDate: null,
    updDate: null,
    applyCertType: 1, // 인증 유형
  });

  const [alertMessage, setAlertMessage] = useState({
    isSuccess: "",
    message: "",
  });

  const [publishDateTxt, setPublishDateTxt] = useState(
    dayjs(new Date()) // 예약 시간
      .hour(23)
      .minute(59)
      .second(59)
      .format("YYYY-MM-DDTHH:mm")
  );

  const [initial, setInitial] = useState(true);

  const [isClickWifiVer, setIsClickWifiVer] = useState(false);

  const [searchText, setSearchText] = React.useState("");
  const [totalRows, setTotalRows] = useState([]);
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "frmwrType",
      headerName: "펌웨어 유형",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "devModelCode",
      headerName: "기기모델코드",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrName",
      headerName: "펌웨어 이름",
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrVer",
      headerName: "펌웨어 버전",
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrId",
      headerName: "펌웨어 아이디",
      width: 400,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const [totalElement, setTotalElement] = useState(0);
  const [param, setParam] = useState({ page: 0, size: 10 });

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#1976de",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#1976de",
    },
  }));

  useEffect(() => {
    // 수정
    if (!isNull(data)) {
      console.log("data >> ", data.publishDate);
      setSubmitData((prevState) => ({
        ...data,
        targetType: data.targetType === "제품군" ? 1 : 2,
        useYn: data.useYn === "Y",
        regDate: dateToTimestampConvert(data.regDate),
        updDate: dateToTimestampConvert(data.updDate),
      }));

      if (data.publishDate === 1) {
        setPublishDateTxt(
          dayjs(new Date()) // 예약 시간
            .hour(23)
            .minute(59)
            .second(59)
            .format("YYYY-MM-DDTHH:mm")
        );
      } else {
        setPublishDateTxt(dayjs(data.publishDate).format("YYYY-MM-DDTHH:mm"));
      }

      setValidation((prevState) => ({
        ...prevState,
        policyName: "is-valid",
        policyDesc: "is-valid",
        targetId: "is-valid",
      }));
    }
  }, [data]);
  const onChageFormData = (e) => {
    const { name, value, checked } = e.target;

    // console.log("name , value >> ", name, dateToTimestampConvert(value));

    if (name === "publishDate") {
      setSubmitData((prevState) => ({
        ...prevState,
        publishDate:
          submitData.publishType === 1 ? "" : dateToTimestampConvert(value),
      }));
      setPublishDateTxt(value);
    } else if (name === "publishType") {
      setSubmitData((prevState) => ({
        ...prevState,
        [name]: value,
        publishDate:
          value === 1
            ? ""
            : dateToTimestampConvert(
                dayjs(new Date()) // 예약 시간
                  .hour(23)
                  .minute(59)
                  .second(59)
                  .format("YYYY-MM-DDTHH:mm")
              ),
      }));
    } else {
      setSubmitData((prevState) => ({
        ...prevState,
        [name]: name === "useYn" ? checked : value,
      }));
    }

    if (name === "policyName" || name === "policyDesc" || name === "targetId") {
      validationField(name, value);
    }
  };

  const validationField = (name, value) => {
    // console.log("name, value :  ", name, value);
    let isValid = "";

    switch (name) {
      case "policyName":
        isValid = rules.checkIsValid(value, 128);
        break;
      case "policyDesc":
        isValid = rules.checkIsValid(value, 2048);
        break;
      case "targetId":
        isValid = rules.checkIsValid(value, 18);
        break;
      default:
        break;
    }

    setValidation((prevState) => ({
      ...prevState,
      [name]: isValid,
    }));
  };

  const checkValidation = () => {
    let result = true;

    for (let key in validation) {
      if (isNull(validation[key]) || validation[key] === "is-invalid") {
        setValidation((prevState) => ({
          ...prevState,
          [key]: "is-invalid",
        }));
        result = false;
      }
    }
    // console.log("result >> ", result);
    return result;
  };

  // 인증서 정책 추가
  const saveCertPolicy = async () => {
    let result = null;

    console.log("submitData >> ", JSON.stringify(submitData));

    if (checkValidation()) {
      if (isEdit) {
        result = await dispatch(
          putCertPolicy({
            formData: submitData,
          })
        );
      } else {
        result = await dispatch(
          postCertPolicy({
            formData: submitData,
          })
        );
      }
      // console.log("result >> ", JSON.stringify(result));
      if (checkResult(result)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          isSuccess: "success",
          message: "Success!",
        }));
        setTimeout(() => {
          history.push("/fota/certPolicyManagement");
        }, 500);
      } else {
        setAlertMessage((prevState) => ({
          ...prevState,
          isSuccess: "fail",
          message: isNull(result.payload.data.header.message)
            ? "Firmware registration"
            : result.payload.data.header.message,
        }));
      }
    }
  };

  const handleSearchClick = async (param, type) => {
    setIsClickWifiVer(type === 1);

    const result = await dispatch(
      getFirmwareList({
        param: makeQuery(param, { frmwrType: type }),
      })
    );
    if (checkResult(result)) {
      setRows(makeRowsFormat(result.payload.payload.content));

      setTotalElement(result.payload.payload.totalElements);

      // 검색용 totalRows
      if (initial) {
        setInitial(false);
        const totalResult = await dispatch(
          getFirmwareList({
            param: makeQuery(
              {
                page: 0,
                size: result.payload.payload.totalElements,
                totalItem: result.payload.payload.totalElements,
              },
              { frmwrType: type }
            ),
          })
        );
        // console.log("totalResult >> ", totalResult);
        setTotalRows(makeRowsFormat(totalResult.payload.payload.content));
      }
      setOpenDialog(true);
    } else {
      setRows([]);
      setTotalElement(0);
    }
  };

  const onRefresh = () => {
    // setPages(0);
    // setPageSize(10);
    handleSearchClick(param, isClickWifiVer ? 1 : 2);
  };

  return (
    <form>
      {alertMessage.isSuccess === "success" && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong> Firmware 정책 관리 registration successful!</strong>
        </Alert>
      )}
      {alertMessage.isSuccess === "fail" && (
        <Alert severity="error">
          <AlertTitle>error</AlertTitle>
          <strong> {alertMessage.message} Fail!</strong>
        </Alert>
      )}
      <CCard className="p-5">
        <div className="row justify-content-center">
          {/* 정책 이름 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer01" className="form-label">
              정책 이름
            </label>
            <input
              type="text"
              name="policyName"
              id="validationServer01"
              value={submitData.policyName}
              required
              onChange={onChageFormData}
              autoComplete="off"
              className={`form-control ${validation.policyName}`}
            />
            <div className="invalid-feedback">
              정책 이름을 입력해주세요. (128자 이내)
            </div>
          </div>
          {/*  정책 설명 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer02" className="form-label">
              정책 설명
            </label>
            <input
              type="text"
              name="policyDesc"
              id="validationServer02"
              value={submitData.policyDesc}
              required
              autoComplete="off"
              onChange={onChageFormData}
              className={`form-control ${validation.policyDesc}`}
            />
            <div className="invalid-feedback">
              정책 설명을 입력해주세요. (2048자 이내)
            </div>
          </div>
          {/* 대상 아이디 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer02" className="form-label">
              대상 아이디
            </label>
            <input
              type="text"
              name="targetId"
              id="validationServer02"
              value={submitData.targetId}
              required
              autoComplete="off"
              onChange={onChageFormData}
              className={`form-control ${validation.targetId}`}
            />
            <div className="invalid-feedback">
              대상 아이디를 입력해주세요. (18자 이내)
            </div>
          </div>
          {/* 배포 대상 유형 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer04" className="form-label">
              배포 대상 유형
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.targetType}
                name="targetType"
                onChange={onChageFormData}
              >
                {getCodeCategoryItems(options, "targetType").map((name) => (
                  <MenuItem
                    key={name.value}
                    value={name.value}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "10px",
                    }}
                  >
                    {name.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* 배포 유형 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer04" className="form-label">
              배포 유형
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.publishType}
                name="publishType"
                onChange={onChageFormData}
              >
                {getCodeCategoryItems(options, "publishType").map((name) => (
                  <MenuItem
                    key={name.value}
                    value={name.value}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "10px",
                    }}
                  >
                    {name.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* 예약 시간 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer04" className="form-label">
              예약 시간
            </label>
            <TextField
              id="datetime-local"
              // label="기간"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              name="publishDate"
              value={publishDateTxt}
              className="form-control"
              onChange={onChageFormData}
              disabled={submitData.publishType === 1}
            />
          </div>
          {/* 인증 유형 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer02" className="form-label mt-1">
              인증 유형
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.applyCertType}
                name="applyCertType"
                onChange={onChageFormData}
              >
                {getCodeCategoryItems(options, "applyCertType").map((name) => (
                  <MenuItem
                    key={name.value}
                    value={name.value}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "10px",
                    }}
                  >
                    {name.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* 정책 상태 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer04" className="form-label">
              정책 상태
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.policyStatus}
                name="policyStatus"
                onChange={onChageFormData}
                disabled={!isEdit}
              >
                {getCodeCategoryItems(options, "policyStatus").map((name) => (
                  <MenuItem
                    key={name.value}
                    value={name.value}
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "10px",
                    }}
                  >
                    {name.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {/* 사용 여부 */}
          <div className="col-md-5 mb-4 mt-3">
            <FormControl component="fieldset" variant="standard">
              <FormControlLabel
                control={
                  <GreenSwitch
                    {...label}
                    checked={submitData.useYn}
                    onChange={onChageFormData}
                    name="useYn"
                  />
                }
                label="사용 여부"
              />
            </FormControl>
          </div>
          <div className="col-md-5 mb-4 ms-5" />
        </div>
        <div className="row justify-content-end mt_25">
          <button
            className="btn btn-info save_btn"
            type="button"
            onClick={saveCertPolicy}
          >
            저장
          </button>
          <button
            className="btn btn-dark cancel_btn ms-3"
            type="button"
            onClick={() => {
              history.goBack();
            }}
          >
            취소
          </button>
        </div>
      </CCard>
    </form>
  );
};

export default CertPolicyManagementDetailPage;
