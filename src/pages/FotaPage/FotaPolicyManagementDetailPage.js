import React, { useState, useEffect } from "react";
import { CCard } from "@coreui/react";
import {
  Alert,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  styled,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Button, Select, Slide, Switch, TextField } from "@material-ui/core";
import {
  checkResult,
  dateToTimestampConvert,
  getCodeCategoryItems,
  isNull,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import {
  getFirmwareList,
  postFotaPolicy,
  putFotaPolicy,
} from "../../redux/reducers/fotaInfoSlice";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import rules from "../../common/utils/rules";

/**
 * FOTA 정책 상세 페이지
 */
const FotaPolicyManagementDetailPage = (props) => {
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
    wifiFrmwrVer: "",
    mcuFrmwrVer: "",
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
    wifiFrmwrVer: "",
    mcuFrmwrVer: "",
    regId: "i.Trust",
    updId: "i.Trust",
    useYn: true,
    wifiApplyType: 1,
    mcuApplyType: 1,
    wifiFrmwrId: "",
    mcuFrmwrId: "",
    wifiTargetFrmwrId: "",
    mcuTargetFrmwrId: "",
    regDate: null,
    updDate: null,
  });

  const [publishDateTxt, setPublishDateTxt] = useState(
    dayjs(new Date()) // 예약 시간
      .hour(23)
      .minute(59)
      .second(59)
      .format("YYYY-MM-DDTHH:mm")
  );

  const [initial, setInitial] = useState(true);

  const [alertMessage, setAlertMessage] = useState({
    isSuccess: "",
    message: "",
  });

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

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = totalRows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

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

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  function QuickSearchToolbar(props) {
    return (
      <Box
        sx={{
          p: 2,
          pb: 1,
          justifyContent: "space-between",
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div>
          {/*<GridToolbarFilterButton />*/}
          {/*<GridToolbarDensitySelector />*/}
        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          autoFocus="autoFocus"
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? "visible" : "hidden" }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{
            width: {
              xs: 1,
              sm: "auto",
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            "& .MuiSvgIcon-root": {
              mr: 0.5,
            },
            "& .MuiInput-underline:before": {
              borderBottom: 1,
              borderColor: "divider",
            },
          }}
        />
      </Box>
    );
  }

  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  useEffect(() => {
    if (!isNull(data)) {
      // console.log("data  >> ", data);
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
        wifiFrmwrVer: "is-valid",
        mcuFrmwrVer: "is-valid",
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
      case "wifiFrmwrVer":
      case "mcuFrmwrVer":
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
    // console.log("result >> ", result);
    return result;
  };

  // 저장 누른경우
  const saveFotaPolicy = async () => {
    let result = null;

    // console.log("submitData 11 >>  ", JSON.stringify(submitData));

    if (checkValidation()) {
      if (isEdit) {
        result = await dispatch(
          putFotaPolicy({
            formData: submitData,
          })
        );
      } else {
        result = await dispatch(
          postFotaPolicy({
            formData: submitData,
          })
        );
      }

      if (checkResult(result)) {
        setAlertMessage((prevState) => ({
          ...prevState,
          isSuccess: "success",
          message: "Success!",
        }));
        setTimeout(() => {
          history.push("/fota/policyManagement");
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
          {/* WIFI 펌웨어 버전 */}
          <div className="col-md-5 mb-4">
            <label htmlFor="validationServer02" className="form-label mt-1">
              WIFI 펌웨어 버전
            </label>
            <TextField
              className={`form-control ${validation.wifiFrmwrVer}`}
              name="wifiFrmwrVer"
              value={submitData.wifiFrmwrVer}
              autoComplete="off"
              required
              onClick={() => {
                handleSearchClick(param, 1);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <div className="invalid-feedback">
              WIFI 펌웨어 버전을 선택해 주세요.
            </div>
          </div>
          {/* MCU 펌웨어 버전 */}
          <div className="col-md-5 mb-4 ms-5">
            <label htmlFor="validationServer02" className="form-label mt-1">
              MCU 펌웨어 버전
            </label>
            <TextField
              className={`form-control ${validation.mcuFrmwrVer}`}
              name="wifiFrmwrVer"
              value={submitData.mcuFrmwrVer}
              autoComplete="off"
              required
              onClick={() => {
                handleSearchClick(param, 2);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <div className="invalid-feedback">
              MCU 펌웨어 버전을 선택해 주세요.
            </div>
          </div>
          {/* 정책 상태 */}
          <div className="col-md-5 mb-4">
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
          <div className="col-md-5 mb-4 ms-5">
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
          </div>
        </div>
        <div className="row justify-content-end mt_25">
          <button
            className="btn btn-info save_btn"
            type="button"
            onClick={saveFotaPolicy}
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
        {/* WIFI , MCU 펌웨어 버전 검색 */}
        <Dialog
          fullWidth={true}
          className="w-100"
          maxWidth="lg"
          open={openDialog}
        >
          <DialogTitle
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              {isClickWifiVer ? (
                <span>WIFI 펌웨어 버전</span>
              ) : (
                <span>MCU 펌웨어 버전</span>
              )}
              <Button
                aria-label="upload picture"
                component="span"
                className="ms-2"
                style={{ color: "#357a38" }}
                onClick={() => {
                  onRefresh();
                }}
              >
                <RefreshIcon />
              </Button>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <div style={{ height: totalElement > 0 ? "auto" : "400px" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                components={{ Toolbar: QuickSearchToolbar }}
                componentsProps={{
                  toolbar: {
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    clearSearch: () => {
                      setPageSize(10);
                      requestSearch("");
                    },
                  },
                }}
                pageSize={pageSize}
                pagination
                paginationMode="server"
                rowCount={totalElement}
                autoHeight={totalElement > 0}
                maxWidth={"xl"}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newPageSize) => {
                  setPageSize(newPageSize);
                  handleSearchClick(
                    {
                      page: pages,
                      size: newPageSize,
                    },
                    isClickWifiVer ? 1 : 2
                  );
                }}
                onPageChange={(newPages) => {
                  setPages(newPages);
                  handleSearchClick(
                    {
                      page: newPages,
                      size: pageSize,
                    },
                    isClickWifiVer ? 1 : 2
                  );
                }}
                onCellClick={(params, event) => {
                  // console.log("params >> ", params.row);
                  event.defaultMuiPrevented = true;

                  let key = "wifiFrmwrVer";
                  let frmwrId = "wifiFrmwrId";

                  if (!isClickWifiVer) {
                    key = "mcuFrmwrVer";
                    frmwrId = "mcuFrmwrId";
                  }

                  validationField(key, params.row);

                  setSubmitData((prevState) => ({
                    ...prevState,
                    [key]: params.row.frmwrVer,
                    [frmwrId]: params.row.frmwrId,
                  }));
                  setOpenDialog(false);
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CCard>
    </form>
  );
};

export default FotaPolicyManagementDetailPage;
