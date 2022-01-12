import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridState,
} from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import { Pagination, PaginationItem } from "@mui/material";
import { Button, Paper, Typography } from "@material-ui/core";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  checkResult,
  getText,
  makeExcelFormat,
  makeQuery,
  makeRowsFormat,
} from "../../common/utils/CowayUtils";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import xlsx from "xlsx";
import {
  getCertPolicyList,
  getFirmwareList,
  getFotaPolicyList,
  getHistoryList,
  getStatusList,
} from "../../lib/api/fotaAPI";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import CustomLoadingOverlay from "./CustomLoadingOverlay";
import AddIcon from "@material-ui/icons/Add";

const DataGridTables = (props) => {
  const defaultTheme = createTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const [pages, setPages] = useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const {
    columns,
    rows,
    totalElement,
    searchOption,
    category,
    isLoading,
    param,
  } = props;
  const options = useSelector((state) => state.sharedInfo.codes);
  const transMsg = useSelector((state) => state.sharedInfo.messages);
  const text = {
    firmware: getText(transMsg, "word.firmware"),
    manage: getText(transMsg, "word.manage"),
    fota: getText(transMsg, "word.fota"),
    policy: getText(transMsg, "word.policy"),
    cert: getText(transMsg, "word.cert"),

    list: getText(transMsg, "word.list"),
    firmwareManage:
      getText(transMsg, "word.firmware") +
      " " +
      getText(transMsg, "word.manage"),
    fotaPolicyManage: getText(transMsg, "word.fotaPolicyManage"),
    certPolicyManage: getText(transMsg, "word.certPolicyManage"),
    statusSearch: getText(transMsg, "word.statusSearch"),
    historySearch: getText(transMsg, "word.historySearch"),
  };

  useEffect(() => {}, []);

  const useStyles = makeStyles(
    (theme) =>
      createStyles({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
        toolbar: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: theme.spacing(2),
        },
        content: {
          // margin: theme.spacing(2),
          padding: theme.spacing(2),
        },
      }),
    { defaultTheme }
  );

  const QuickSearchToolbar = (props) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <div>
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          className={classes.textField}
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
        />
      </div>
    );
  };

  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const [state] = useGridState(apiRef);

    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={state.pagination.page + 1}
        count={state.pagination.pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  };

  const excelDownload = async () => {
    // console.log("totalElement >> ", totalElement, searchOption);
    let result = "";

    let title = "";
    let query = makeQuery(
      { page: 0, size: totalElement, totalItem: totalElement },
      searchOption
    );

    switch (category) {
      case "firmwareManage":
        title = text.firmwareManage;
        result = await getFirmwareList(query);
        break;
      case "fotaPolicyManage":
        title = text.fotaPolicyManage;
        result = await getFotaPolicyList(query);
        break;
      case "certPolicyManage":
        title = text.certPolicyManage;
        result = await getCertPolicyList(query);
        break;
      case "statusSearch":
        title = text.statusSearch + " " + text.list;
        result = await getStatusList(query);
        break;
      case "historySearch":
        title = text.historySearch + " " + text.list;
        result = await getHistoryList(query);
        break;
      default:
        break;
    }
    if (checkResult(result.data)) {
      const row = makeRowsFormat(result.data.payload.content, options);
      const data = makeExcelFormat(row, columns);
      const ws = xlsx.utils.json_to_sheet(data);
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
      xlsx.writeFile(
        wb,
        `${title}_${dayjs(new Date()).format("YYMMDDHHmmssSSS")}.xlsx`
      );
    } else {
      // TODO. 엑셀다운로드 실패
    }
  };

  const goRegsiterPage = () => {
    // console.log("category >> ", category);
    switch (category) {
      case "firmwareManage":
        history.push({
          pathname: "/fota/firmwareManagementDetail",
          state: { isEdit: false },
        });
        break;
      case "fotaPolicyManage":
        history.push({
          pathname: "/fota/policyManagementDetail",
          state: { isEdit: false },
        });
        break;
      case "certPolicyManage":
        history.push({
          pathname: "/fota/certPolicyManagementDetail",
          state: { isEdit: false },
        });
        break;
      default:
        break;
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.content}>
        <div className={classes.toolbar}>
          <Typography variant="h6" component="h2" className="p-1">
            {text[category]}
          </Typography>
          <div>
            {category !== "historySearch" && category !== "statusSearch" && (
              <Button
                variant="outlined"
                style={{ color: "#1976DE" }}
                className="ms-2"
                startIcon={<AddIcon />}
                onClick={() => goRegsiterPage()}
              >
                New
              </Button>
            )}
            <Button
              variant="outlined"
              aria-label="Refresh"
              component="span"
              className="ms-2"
              style={{ color: "#1769aa" }}
              startIcon={<RefreshIcon />}
              onClick={() => {
                props.onRefresh();
              }}
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              aria-label="Excel Download"
              component="span"
              className="ms-2"
              startIcon={<FileDownloadIcon />}
              onClick={excelDownload}
              style={{ color: "#357a38" }}
            >
              Excel Download
            </Button>
          </div>
        </div>
        <div
          className="w-100"
          style={{ height: totalElement > 0 ? "auto" : "400px" }}
        >
          <DataGrid
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: CustomLoadingOverlay,
            }}
            loading={isLoading}
            rows={rows}
            columns={columns}
            pagination
            pageSize={param.size}
            rowsPerPageOptions={[5, 10, 20]}
            onCellClick={(param) => {
              // console.log("onCellClick >> ", param);
              if (category === "statusSearch" && param.field !== "editDelete") {
                props.rowDetail(param.row);
              }
            }}
            onPageSizeChange={(newPageSize) => {
              props.onFetchData({
                page: pages,
                size: newPageSize,
              });

              setPageSize(newPageSize);
            }}
            onPageChange={(newPages) => {
              props.onFetchData({
                page: newPages,
                size: param.size,
              });

              setPages(newPages);
            }}
            rowCount={totalElement}
            paginationMode="server"
            autoHeight={totalElement > 0}
            columnBuffer={2}
            columnThreshold={2}
            // pagination
            // className={classes.test}
            // cell--textCenter={true}
            // checkboxSelection
            // components={{ Toolbar: QuickSearchToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     value: searchText,
            //     onChange: (event) => requestSearch(event.target.value),
            //     clearSearch: () => requestSearch(""),
            //   },
            // }}
          />

          {/*<CPagination aria-label="Page navigation example">*/}
          {/*  <CPaginationItem aria-label="Previous">*/}
          {/*    <span aria-hidden="true">&laquo;</span>*/}
          {/*  </CPaginationItem>*/}
          {/*  <CPaginationItem>1</CPaginationItem>*/}
          {/*  <CPaginationItem>2</CPaginationItem>*/}
          {/*  <CPaginationItem>3</CPaginationItem>*/}
          {/*  <CPaginationItem aria-label="Next">*/}
          {/*    <span aria-hidden="true">&raquo;</span>*/}
          {/*  </CPaginationItem>*/}
          {/*</CPagination>*/}
        </div>
        <div>
          {category !== "historySearch" && category !== "statusSearch" && (
            <Button
              variant="outlined"
              style={{ color: "#1976DE" }}
              className="ms-2"
              startIcon={<AddIcon />}
              onClick={() => goRegsiterPage()}
            >
              New
            </Button>
          )}
          <Button
            variant="outlined"
            aria-label="Refresh"
            component="span"
            className="ms-2"
            style={{ color: "#1769aa" }}
            startIcon={<RefreshIcon />}
            onClick={() => {
              props.onRefresh();
            }}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            aria-label="Excel Download"
            component="span"
            className="ms-2"
            startIcon={<FileDownloadIcon />}
            onClick={excelDownload}
            style={{ color: "#357a38" }}
          >
            Excel Download
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default DataGridTables;
