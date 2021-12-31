import React, { useState, useEffect } from "react";
import { CCard } from "@coreui/react";
import { FormControlLabel, styled } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Select, Switch, TextField } from "@material-ui/core";
import {
  checkResult,
  dateToTimestampConvert,
  getCodeCategoryItems,
  getText,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getFirmwareList,
  postCertPolicy,
  putCertPolicy,
} from "../../redux/reducers/fotaInfoSlice";
import rules from "../../common/utils/rules";
import AlertMessage from "../../components/AlertMessage";

/**
 * 인증서 정책관리 상세 페이지
 */
const CertPolicyManagementDetailPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = isNull(props.location.state) ? "" : props.location.state;
  const { isEdit } = isNull(props.location.state) ? "" : props.location.state;
  const [openDialog, setOpenDialog] = useState(false);
  const [validation, setValidation] = useState({
    policyName: "",
    policyDesc: "",
    targetId: "",
  });
  const options = useSelector((state) => state.sharedInfo.codes);
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

  const [totalRows, setTotalRows] = useState([]);
  const [rows, setRows] = useState([]);

  const transMsg = useSelector((state) => state.sharedInfo.messages);
  const text = {
    devModelCode: getText(transMsg, "word.devModelCode"),
    policy: getText(transMsg, "word.policy"),
    name: getText(transMsg, "word.name"),
    desc: getText(transMsg, "word.desc"),
    status: getText(transMsg, "word.status"),
    target: getText(transMsg, "word.target"),
    publish: getText(transMsg, "word.publish"),
    type: getText(transMsg, "word.type"),
    regId: getText(transMsg, "word.regId"),
    regDate: getText(transMsg, "word.regDate"),
    updId: getText(transMsg, "word.updId"),
    updDate: getText(transMsg, "word.updDate"),
    use: getText(transMsg, "word.use"),
    yn: getText(transMsg, "word.yn"),
    valid_tempError: getText(transMsg, "desc.tempError"),
    search: getText(transMsg, "word.search"),
    id: getText(transMsg, "word.id"),
    term: getText(transMsg, "word.term"),
    firmware: getText(transMsg, "word.firmware"),
    ver: getText(transMsg, "word.ver"),
    valid_policyName: getText(transMsg, "desc.validation.policyName"),
    valid_policyDesc: getText(transMsg, "desc.validation.policyDesc"),
    valid_targetId: getText(transMsg, "desc.validation.targetId"),
    reservation: getText(transMsg, "word.reservation"),
    time: getText(transMsg, "word.time"),
    cert: getText(transMsg, "word.cert"),
    save: getText(transMsg, "word.save"),
    cancel: getText(transMsg, "word.cancel"),
  };
  const columns = [
    {
      field: "frmwrType",
      headerName: text.firmware + " " + text.firmware,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "devModelCode",
      headerName: text.devModelCode,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrName",
      headerName: text.firmware + " " + text.name,
      width: 300,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrVer",
      headerName: text.firmware + " " + text.ver,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "frmwrId",
      headerName: text.firmware + " " + text.id,
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
        <AlertMessage
          isSuccess={true}
          title={"Success"}
          message={"Firmware registration successful!"}
        />
      )}
      {alertMessage.isSuccess === "fail" && (
        <AlertMessage
          isSuccess={false}
          title={"Error"}
          message={alertMessage.message}
        />
      )}
      <CCard className="p-5">
        <div className="row justify-content-center">
          {/* 정책 이름 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer01" className="form-label">
              {text.policy + " " + text.name}
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
            <div className="invalid-feedback">{text.valid_policyName}</div>
          </div>
          {/*  정책 설명 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer02" className="form-label">
              {text.policy + " " + text.desc}
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
            <div className="invalid-feedback">{text.valid_policyDesc}</div>
          </div>
          {/* 대상 아이디 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer02" className="form-label">
              {text.target + " " + text.id}
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
            <div className="invalid-feedback">{text.valid_targetId}</div>
          </div>
          {/* 배포 대상 유형 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer04" className="form-label">
              {text.publish + " " + text.target + " " + text.type}
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
              {text.publish + " " + text.type}
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
              {text.reservation + " " + text.time}
            </label>
            <TextField
              id="datetime-local"
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
              {text.cert + " " + text.type}
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
              {text.policy + " " + text.status}
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
                label={text.use + " " + text.yn}
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
            {text.save}
          </button>
          <button
            className="btn btn-dark cancel_btn ms-3"
            type="button"
            onClick={() => {
              history.goBack();
            }}
          >
            {text.cancel}
          </button>
        </div>
      </CCard>
    </form>
  );
};

export default CertPolicyManagementDetailPage;
