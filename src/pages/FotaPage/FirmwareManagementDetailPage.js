import React, { useState, useEffect } from "react";
import { CCard } from "@coreui/react";
import { useHistory } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Alert, AlertTitle, FormControlLabel, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  checkResult,
  dateToTimestampConvert,
  getCodeCategoryItems,
  isNull,
} from "../../common/utils/CowayUtils";
import { postFirmware, putFirmware } from "../../redux/reducers/fotaInfoSlice";
import DropZone from "../../components/DropZone";
import rules from "../../common/utils/rules";
import { Switch, Select } from "@material-ui/core";

/**
 * 펌웨어관리 상세 페이지
 */
const FirmwareManagementDetailPage = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { data } = isNull(props.location.state) ? "" : props.location.state;
  const { isEdit } = isNull(props.location.state) ? "" : props.location.state;

  const [validation, setValidation] = useState({
    frmwrName: "",
    frmwrDesc: "",
    frmwrVer: "",
    firmwareFile: "",
  });

  const [alertMessage, setAlertMessage] = useState({
    isSuccess: "",
    message: "",
  });

  const options = useSelector((state) => state.getData.codes);

  const [submitData, setSubmitData] = useState({
    frmwrName: "",
    frmwrDesc: "",
    frmwrVer: "",
    frmwrType: 1,
    devModelCode: getCodeCategoryItems(options, "devModelCode")[1].value,
    regId: "i.Trust",
    updId: "i.Trust",
    useYn: true,
    file: null,
    firmwareId: "",
    fileName: "",
    hardwareType: 0,
  });
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
      // console.log("data >> ", data);
      setSubmitData((prevState) => ({
        ...data,
        frmwrType: data.frmwrType === "WIFI" ? 1 : 2,
        hardwareType: 0,
        regDate: data.regDate,
        updDate: dateToTimestampConvert(data.updDate),
        useYn: data.useYn === "Y",
        fileSize: Number(data.fileSize),
      }));

      setValidation((prevState) => ({
        ...prevState,
        frmwrName: "is-valid",
        frmwrDesc: "is-valid",
        frmwrVer: "is-valid",
        firmwareFile: "is-valid",
      }));
    }
  }, [data]);

  // data 변경
  const onChageFormData = (e) => {
    const { name, value, checked } = e.target;

    setSubmitData((prevState) => ({
      ...prevState,
      [name]: name === "useYn" ? checked : value,
    }));

    // validation check 요소
    if (
      name === "frmwrName" ||
      name === "frmwrVer" ||
      name === "frmwrDesc" ||
      name === "firmwareFile"
    ) {
      validationField(name, value);
    }
  };

  const validationField = (name, value) => {
    // console.log("name, value :  ", name, value);
    let isValid = "";

    switch (name) {
      case "frmwrName":
      case "frmwrVer":
        isValid = rules.checkIsValid(value, 128);
        break;
      case "frmwrDesc":
        isValid = rules.checkIsValid(value, 2048);
        break;
      case "firmwareFile":
        isValid = isNull(value) ? "is-invalid" : "is-valid";
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

    return result;
  };

  // 펌웨어 저장
  const saveFirmware = async () => {
    if (checkValidation()) {
      let result = null;

      if (!isEdit) {
        // 데이터 전송
        const formData = new FormData();

        formData.append("frmwrName", submitData.frmwrName);
        formData.append("frmwrVer", submitData.frmwrVer);
        formData.append("frmwrDesc", submitData.frmwrDesc);
        formData.append("frmwrType", submitData.frmwrType);
        formData.append(
          "hwType",
          submitData.frmwrType === 2 ? 0 : submitData.hardwareType
        );
        formData.append("devModelCode", submitData.devModelCode);
        formData.append("file", submitData.file);
        formData.append("regId", submitData.regId);

        // console.log("submitData >>  ", JSON.stringify(submitData));
        // 펌웨어 저장
        result = await dispatch(
          postFirmware({
            formData: formData,
          })
        );
      } else {
        // console.log("edit submitData >> ", JSON.stringify(submitData));
        result = await dispatch(
          putFirmware({
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
          history.push("/fota/firmwareManagement");
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
    } else {
      // validation 실패 문구
      setAlertMessage((prevState) => ({
        ...prevState,
        isSuccess: "fail",
        message: "Validation",
      }));
    }
  };

  const handleFileChange = (files) => {
    setSubmitData((prevState) => ({
      ...prevState,
      file: files,
    }));
    validationField("firmwareFile", files);
  };

  return (
    <form>
      {alertMessage.isSuccess === "success" && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong> Firmware registration successful!</strong>
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
          {/* 펌웨어 이름 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer01" className="form-label">
              펌웨어 이름
            </label>
            <input
              type="text"
              name="frmwrName"
              id="validationServer01"
              value={submitData.frmwrName}
              required
              onChange={onChageFormData}
              autoComplete="off"
              className={`form-control ${validation.frmwrName}`}
            />
            <div className="invalid-feedback">
              펌웨어 이름을 입력해주세요. (128자 이내)
            </div>
          </div>
          {/* 펌웨어 설명 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer02" className="form-label">
              펌웨어 설명
            </label>
            <input
              type="text"
              name="frmwrDesc"
              id="validationServer02"
              value={submitData.frmwrDesc}
              required
              autoComplete="off"
              onChange={onChageFormData}
              className={`form-control ${validation.frmwrDesc}`}
            />
            <div className="invalid-feedback">
              펌웨어 설명을 입력해주세요. (2048자 이내)
            </div>
          </div>
          {/* 펌웨어 버전 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer02" className="form-label">
              펌웨어 버전
            </label>
            <input
              type="text"
              name="frmwrVer"
              id="validationServer02"
              value={submitData.frmwrVer}
              required
              autoComplete="off"
              onChange={onChageFormData}
              className={`form-control ${validation.frmwrVer}`}
            />
            <div className="invalid-feedback">
              펌웨어 버전을 입력해주세요. (128자 이내)
            </div>
          </div>
          {/* 펌웨어 유형 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer04" className="form-label">
              펌웨어 유형
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.frmwrType}
                name="frmwrType"
                onChange={onChageFormData}
              >
                {getCodeCategoryItems(options, "frmwrType").map(
                  (name, index) => {
                    if (index > 0) {
                      return (
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
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </Select>
            </FormControl>
          </div>
          {/* 하드웨어 유형 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer04" className="form-label">
              하드웨어 유형
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.hardwareType}
                name="wifiHwType"
                onChange={onChageFormData}
              >
                {submitData.frmwrType === 1
                  ? getCodeCategoryItems(options, "wifiHwType").map((name) => (
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
                    ))
                  : getCodeCategoryItems(options, "mcuHwType").map((name) => (
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
          {/* 기기모델 코드 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer04" className="form-label">
              기기모델 코드
            </label>
            <FormControl fullWidth size="small">
              <Select
                value={submitData.devModelCode}
                name="devModelCode"
                onChange={onChageFormData}
              >
                {getCodeCategoryItems(options, "devModelCode").map(
                  (name, index) => {
                    if (index > 0) {
                      return (
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
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* 파일 업로드 */}
        <DropZone
          onCreate={handleFileChange}
          isEmpty={validation.firmwareFile}
          filename={isEdit && String(data.fileName)}
          isEdit={isEdit}
        />
        {/* // 파일 업로드 */}
        <div className="row justify-content-end mt_25">
          {/* 사용 여부 */}
          <div className="mt-4">
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
          <button
            className="btn btn-info save_btn"
            type="button"
            onClick={saveFirmware}
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

export default FirmwareManagementDetailPage;
