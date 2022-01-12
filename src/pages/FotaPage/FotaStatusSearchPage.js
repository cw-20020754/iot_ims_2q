import React, { useState, useEffect, useCallback } from "react";
import { Select, TextField } from "@material-ui/core";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import {
  checkResult,
  escapeRegExp,
  getCodeCategoryItems,
  getText,
  isNull,
  makeQuery,
  makeRowsFormat,
  reformatData,
} from "../../common/utils/CowayUtils";
import MenuItem from "@mui/material/MenuItem";
import DataGridTables from "../../components/table/DataGridTables";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import MatEdit from "../../components/table/MatEdit";
import {
  getHistoryList,
  getStatusList,
} from "../../redux/reducers/fotaInfoSlice";
import AlertMessage from "../../components/AlertMessage";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import CustomLoadingOverlay from "../../components/table/CustomLoadingOverlay";
import CustomNoRowsOverlay from "../../components/table/CustomNoRowsOverlay";
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from "@coreui/react";

/**
 * 포타 상태 조회
 */

const FotaStatusSearchPage = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const codes = useSelector((state) => state.sharedInfo.codes);
  const [startDate, setStartDate] = useState(
    dayjs(new Date())
      .add(-7, "days")
      .hour(0)
      .minute(0)
      .second(0)
      .format("YYYY-MM-DDTHH:mm")
  );

  const [endDate, setEndDate] = useState(
    dayjs(new Date()).hour(23).minute(59).second(59).format("YYYY-MM-DDTHH:mm")
  );
  const [searchOption, setSearchOption] = useState({
    fotaStatus: "",
    devModelCode: "",
    startDate: startDate,
    endDate: endDate,
    serial: "",
    certStatus: "",
  });

  const [param, setParam] = useState({ page: 0, size: 5 });

  const fotaStatusList = useSelector((state) => state.fotaInfo.fotaStatus.list);
  const fotaStatusTotal = useSelector(
    (state) => state.fotaInfo.fotaStatus.totalElements
  );
  const [searchText, setSearchText] = React.useState("");
  const [desiredList, setDesiredList] = useState(null);
  const [reportedList, setReportedList] = useState(null);

  const transMsg = useSelector((state) => state.sharedInfo.messages);

  const [openDetails, setOpenDetails] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  const text = {
    serialNum: getText(transMsg, "word.serialNum"),
    devModelCode: getText(transMsg, "word.devModelCode"),
    fota: getText(transMsg, "word.fota"),
    status: getText(transMsg, "word.status"),
    cert: getText(transMsg, "word.cert"),
    regId: getText(transMsg, "word.regId"),
    regDate: getText(transMsg, "word.regDate"),
    updId: getText(transMsg, "word.updId"),
    updDate: getText(transMsg, "word.updDate"),
    valid_tempError: getText(transMsg, "desc.tempError"),
    search: getText(transMsg, "word.search"),
    term: getText(transMsg, "word.term"),
    policy: getText(transMsg, "word.policy"),
    name: getText(transMsg, "word.name"),
    target: getText(transMsg, "word.target"),
    id: getText(transMsg, "word.id"),
    wifi: getText(transMsg, "word.wifi"),
    firmware: getText(transMsg, "word.firmware"),
    file: getText(transMsg, "word.file"),
    ver: getText(transMsg, "word.ver"),
    size: getText(transMsg, "word.size"),
    url: getText(transMsg, "word.url"),
    mcu: getText(transMsg, "word.mcu"),
    expired: getText(transMsg, "word.expired"),
    expected: getText(transMsg, "word.expected"),
    yn: getText(transMsg, "word.yn"),
    history: getText(transMsg, "word.history"),
    originDt: getText(transMsg, "word.originDt"),
    query: getText(transMsg, "word.query"),
    type: getText(transMsg, "word.type"),
  };
  const [historyParam, setHistoryParam] = useState({ page: 0, size: 5 });

  const [historyRows, setHistoryRows] = useState([]);
  const [totalHistoryRows, setTotalHistoryRows] = useState([]);
  const [rowData, setRowData] = useState(null);

  const historyColumns = [
    {
      field: "originDt",
      headerName: text.originDt,
      width: 200,
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
      field: "serial",
      headerName: text.serialNum,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "certStatusName",
      headerName: text.cert + text.status,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFotaStatus",
      headerName: text.wifi + " " + text.fota + " " + text.status,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "wifiFrmwrVer",
      headerName: text.wifi + " " + text.firmware + " " + text.ver,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFotaStatus",
      headerName: text.mcu + " " + text.fota + " " + text.status,
      width: 200,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mcuFrmwrVer",
      headerName: text.mcu + " " + text.firmware + " " + text.ver,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "isCertExpired",
      headerName: text.cert + " " + text.expired + text.yn,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "queryType",
      headerName: text.query + " " + text.type,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regId",
      headerName: text.regId,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regDate",
      headerName: text.regDate,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updId",
      headerName: text.updId,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updDate",
      headerName: text.updDate,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columns = [
    {
      field: "editDelete",
      headerName: "",
      editable: false,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filter: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <MatEdit
            category={"fotaStatus"}
            param={params.row}
            pages={param}
            searchOption={searchOption}
            handleDetailClick={handleDetailClick}
          />
        );
      },
    },
    {
      field: "serial",
      headerName: text.serialNum,
      width: 250,
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
      field: "fotaShadowStatus",
      headerName: text.fota + " " + text.status,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "certShadowStatus",
      headerName: text.cert + " " + text.status,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regId",
      headerName: text.regId,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "regDate",
      headerName: text.regDate,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updId",
      headerName: text.updId,
      width: 150,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "updDate",
      headerName: text.updDate,
      width: 250,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
  ];

  const columnsDetail = [
    {
      field: "wifiFileName",
      headerName: text.wifi + " " + text.firmware + text.file + text.name,
    },
    {
      field: "wifiFrmwrVer",
      headerName: text.wifi + " " + text.firmware + " " + text.ver,
    },
    {
      field: "wifiFileSize",
      headerName: text.wifi + " " + text.firmware + " " + text.file + text.size,
    },
    {
      field: "wifiFileUrl",
      headerName:
        text.wifi + " " + text.firmware + " " + text.file + " " + text.url,
    },
    {
      field: "wifiFotaStatus",
      headerName: text.wifi + " " + text.fota + " " + text.status,
    },
    {
      field: "mcuFileName",
      headerName: text.mcu + " " + text.firmware + text.file + text.name,
    },
    {
      field: "mcuFrmwrVer",
      headerName: text.mcu + " " + text.firmware + " " + text.ver,
    },
    {
      field: "mcuFileSize",
      headerName: text.mcu + " " + text.firmware + " " + text.file + text.size,
    },
    {
      field: "mcuFileUrl",
      headerName:
        text.mcu + " " + text.firmware + " " + text.file + " " + text.url,
    },
    {
      field: "mcuFotaStatus",
      headerName: text.mcu + " " + text.fota + " " + text.status,
    },
    {
      field: "certStatusName",
      headerName: text.cert + text.status,
    },
    {
      field: "isCertExpired",
      headerName:
        text.cert + " " + text.expired + text.expected + " " + text.yn,
    },
    {
      field: "regId",
      headerName: text.regId,
    },
    {
      field: "regDate",
      headerName: text.regDate,
    },
    {
      field: "updId",
      headerName: text.updId,
    },
    {
      field: "updDate",
      headerName: text.updDate,
    },
  ];

  const rowDetail = (data) => {
    window.scrollTo(0, 0);
    setOpenDetails(false);
    setDesiredList(data.desired);
    setReportedList(data.reported);
    setRowData(data);
    setOpenDetails(true);
  };

  const [isFail, setIsFail] = useState(false);

  const [totalHistory, setTotalHistory] = useState(0);

  const onHandleSearch = () => {
    setShowSearch(!showSearch);
  };

  const onChangeFormData = (e) => {
    const { name, value } = e.target;

    setSearchOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDetailClick = async (type, data) => {
    if (type === "info") {
      rowDetail(data);
    } else if (type === "history") {
      setRowData(data);
      setHistoryRows([]);

      setHistoryLoading(true);
      setOpenHistory(true);

      const result = await dispatch(
        getHistoryList({
          param: makeQuery(param, {
            devModelCode: data.devModelCode,
            serial: data.serial,
          }),
        })
      );
      // console.log("result  >> ", result);
      if (checkResult(result)) {
        setHistoryLoading(false);
        if (result.payload.payload.content.length > 0) {
          setHistoryRows(makeRowsFormat(result.payload.payload.content, codes));
          setTotalHistory(result.payload.payload.totalElements);
          const totalResult = await dispatch(
            getHistoryList({
              param: makeQuery({
                page: 0,
                size: result.payload.payload.totalElements,
                totalItem: result.payload.payload.totalElements,
                serial: data.serial,
                devModelCode: data.devModelCode,
              }),
            })
          );
          if (checkResult(totalResult)) {
            setTotalHistoryRows(
              makeRowsFormat(totalResult.payload.payload.content, codes)
            );
          }
        } else {
          historyRows([]);
          setTotalHistory(0);
        }
        setHistoryLoading(false);
      } else {
        historyRows([]);
        setTotalHistory(0);
        setHistoryLoading(false);
      }
    }
  };

  const handleSearchClick = async (param) => {
    setHistoryLoading(true);

    const result = await dispatch(
      getHistoryList({
        param: makeQuery(param, {
          devModelCode: rowData.devModelCode,
          serial: rowData.serial,
        }),
      })
    );

    if (!isNull(result)) {
      setOpenHistory(true);
      setHistoryRows(makeRowsFormat(result.payload.payload.content, codes));
      setTotalHistory(result.payload.payload.totalElements);
      setHistoryLoading(false);
    }
  };

  // 리프레시 누른 경우
  const onRefresh = () => {
    setStartDate(
      dayjs(new Date())
        .add(-7, "days")
        .hour(0)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DDTHH:mm")
    );
    setEndDate(
      dayjs(new Date())
        .hour(23)
        .minute(59)
        .second(59)
        .format("YYYY-MM-DDTHH:mm")
    );

    setSearchOption({
      fotaStatus: "",
      devModelCode: "",
      startDate: startDate,
      endDate: endDate,
      serial: "",
      certStatus: "",
    });
    setShowSearch(false);
    onFetchData();
    window.scrollTo(0, 0);
  };

  const onFetchData = useCallback(
    async (data) => {
      if (initial) {
        setInitial(false);
      }
      setOpenDetails(false);
      setIsLoading(true);

      let params = null;
      if (isNull(data)) {
        params = param;
      } else {
        params = data;
        setParam(data);
      }
      let option = initial ? "" : searchOption;

      const result = await dispatch(
        getStatusList({
          param: makeQuery(params, option),
        })
      );

      if (!isNull(result)) {
        setIsLoading(false);

        if (isNull(result.payload)) {
          setIsFail(true);

          setTimeout(() => {
            setIsFail(false);
          }, 3000);
        }
      }
    },
    [dispatch, param, searchOption, initial]
  );

  const setColumnDetail = (type, row) => {
    const { field } = row;

    if (
      type === "desired" &&
      (isNull(desiredList) || isNull(desiredList[field]))
    ) {
      return "-";
    }

    if (
      type === "reported" &&
      (isNull(reportedList) || isNull(reportedList[field]))
    ) {
      return "-";
    }

    const value = type === "desired" ? desiredList[field] : reportedList[field];

    switch (field) {
      case "originDt":
      case "regDate":
      case "updDate":
        return reformatData("date", value, field, codes);
      case "wifiFileSize":
      case "mcuFileSize":
        return reformatData("fileSize", value, field, codes);
      case "wifiFotaStatus":
      case "mcuFotaStatus":
        return reformatData("text", value, "fotaStatus", codes);
      case "isCertExpired":
        return reformatData("yn", value);
      default:
        return value;
    }
  };

  const DenseTable = (props) => {
    const { type } = props;

    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columnsDetail.map((column, index) => {
                return <TableCell key={index}>{column.headerName}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columnsDetail.map((row) => (
                <TableCell align={"center"} key={row.headerName}>
                  {setColumnDetail(type, row)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const FotaStatusDetail = () => {
    return (
      <>
        <div className="mb-3 mt-3 bg_white">
          <Alert variant="outlined" severity="info" className="mb-3 scrollable">
            Desired Data
            <DenseTable type="desired" />
          </Alert>
        </div>
        <div className="mb-3 mt-3 bg_white">
          <Alert variant="outlined" severity="info" className="mb-3 scrollable">
            Reported Data
            <DenseTable type="reported" />
          </Alert>
        </div>
      </>
    );
  };

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
          autoFocus={true}
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

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = totalHistoryRows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    setHistoryRows(filteredRows);
    setTotalHistory(filteredRows.length);
  };

  useEffect(() => {
    // 검색 결과 1개인 경우
    if (fotaStatusTotal === 1) {
      setOpenDetails(true);
      rowDetail(fotaStatusList[0]);
    }
    if (initial) {
      onFetchData();
    }
  }, [onFetchData, initial, fotaStatusTotal, fotaStatusList]);

  return (
    <div>
      {isFail && (
        <AlertMessage
          isSuccess={false}
          title={"Error"}
          message={text.valid_tempError}
        />
      )}
      {/* 검색 */}
      <CAccordion flush={true}>
        <CAccordionItem>
          <CAccordionHeader>{text.search}</CAccordionHeader>
          <CAccordionBody className="mb-2">
            {/* 캘린더 Native pickers */}
            <div className="p-3">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="datetime-local"
                  label="기간"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="startDate"
                  value={searchOption.startDate}
                  className="col-md-5 mb-4"
                  onChange={onChangeFormData}
                />
                <span className="p-3 mb-4"> ~ </span>
                <TextField
                  id="datetime-local"
                  label={text.term}
                  type="datetime-local"
                  value={searchOption.endDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="endDate"
                  className="col-md-5 mb-4 ms-3"
                  onChange={onChangeFormData}
                />
              </div>
              <Button
                variant="outlined"
                className="ms-4"
                style={{ color: "#1976DE" }}
                startIcon={<SearchIcon />}
                onClick={() => {
                  onFetchData();
                }}
              >
                Search
              </Button>
            </div>
            <div className="row ms-4">
              <div className="col-md-2 mb-4">
                <label htmlFor="inputState" className="form-label">
                  {text.fota + " " + text.status}
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.fotaStatus}
                    name="fotaStatus"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(codes, "fotaShadowStatus").map(
                      (name) => (
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
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-2 mb-4">
                <label htmlFor="inputState" className="form-label">
                  {text.cert + " " + text.status}
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.certStatus}
                    name="certStatus"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(codes, "fotaShadowStatus").map(
                      (name) => (
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
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-2 mb-4">
                <label htmlFor="validationServer04" className="form-label">
                  {text.devModelCode}
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    value={searchOption.devModelCode}
                    name="devModelCode"
                    onChange={onChangeFormData}
                  >
                    {getCodeCategoryItems(codes, "devModelCode").map((name) => (
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
              <div className="col-md-4 mb-4">
                <label htmlFor="inputEmail4" className="form-label">
                  {text.serialNum}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={searchOption.serial}
                  name="serial"
                  onChange={onChangeFormData}
                />
              </div>
            </div>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      {openDetails && <FotaStatusDetail />}
      {/* 상태 이력 검색 */}
      <Dialog
        fullWidth={true}
        className="w-100"
        maxWidth="lg"
        open={openHistory}
      >
        <DialogTitle
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <span>{text.fota + " " + text.history}</span>
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
            onClick={() => {
              setOpenHistory(false);
              setSearchText("");
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ height: totalHistory > 0 ? "auto" : "400px" }}>
            <DataGrid
              loading={historyLoading}
              rows={historyRows}
              columns={historyColumns}
              components={{
                Toolbar: QuickSearchToolbar,
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: CustomLoadingOverlay,
              }}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  onChange: (event) => requestSearch(event.target.value),
                  clearSearch: () => {
                    setHistoryParam((prevState) => ({
                      ...prevState,
                      size: 5,
                    }));
                    requestSearch("");
                  },
                },
              }}
              pageSize={historyParam.size}
              pagination
              paginationMode="server"
              rowCount={totalHistory}
              autoHeight={totalHistory > 0}
              maxWidth={"xl"}
              rowsPerPageOptions={[5, 10, 20]}
              onPageSizeChange={(newPageSize) => {
                setHistoryParam((prevState) => ({
                  ...prevState,
                  size: newPageSize,
                }));

                handleSearchClick({
                  page: historyParam.page,
                  size: newPageSize,
                });
              }}
              onPageChange={(newPages) => {
                setHistoryParam((prevState) => ({
                  ...prevState,
                  page: newPages,
                }));
                handleSearchClick({
                  page: newPages,
                  size: historyParam.size,
                });
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
      {/* 테이블 영역 */}
      <DataGridTables
        rows={
          !isNull(fotaStatusList) &&
          Array.isArray(fotaStatusList) &&
          fotaStatusList.length > 0 &&
          makeRowsFormat(fotaStatusList, codes)
        }
        columns={columns}
        param={param}
        totalElement={fotaStatusTotal}
        isLoading={isLoading}
        searchOption={searchOption}
        category={"statusSearch"}
        onFetchData={onFetchData}
        rowDetail={rowDetail}
        onRefresh={onRefresh}
      />
    </div>
  );
};

export default FotaStatusSearchPage;
